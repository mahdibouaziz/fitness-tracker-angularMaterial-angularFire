import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercice } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  ongoingTraining = false;
  private availableExercices: Exercice[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  public exerciceListener = new Subject<Exercice[]>();

  private exercices: Exercice[] = [];

  private runningExercice: Exercice;

  constructor() {}

  getAvailableExercices(): Exercice[] {
    return [...this.availableExercices];
  }

  startExercice(selectedId: string) {
    this.runningExercice = this.availableExercices.find(
      (ex) => ex.id === selectedId
    );
  }

  completeExercice() {
    this.exercices.push({
      ...this.runningExercice,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercice = null;
    this.exerciceListener.next();
  }

  cancelExercice(progress: number) {
    // console.log(this.runningExercice);
    this.exercices.push({
      ...this.runningExercice,
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercice = null;
    this.exerciceListener.next();
  }

  getRunningExercice(): Exercice {
    return { ...this.runningExercice };
  }

  getExercices(): Exercice[] {
    return { ...this.exercices };
  }
}
