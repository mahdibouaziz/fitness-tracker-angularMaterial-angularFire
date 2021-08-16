import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  ongoingTraining = false;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fireBaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  fetchAvailableExercises() {
    this.fireBaseSubscriptions.push(
      this.db
        .collection('availableExercices')
        .snapshotChanges()
        .pipe(
          map((docArray: any) => {
            return docArray.map((doc: any) => {
              return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
            });
          })
        )
        .subscribe(
          (exercices: Exercise[]) => {
            this.availableExercises = exercices;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            this.snackBar.open(
              'Fetching Exercices Failed, Please try again later',
              null,
              { duration: 3000 }
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercices/'+selectedId).update({
    //   lastSelected:new Date()
    // })
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fireBaseSubscriptions.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: any) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubscriptions() {
    this.fireBaseSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private addDataToDatabase(exercice: Exercise) {
    this.db.collection('finishedExercises').add(exercice);
  }
}
