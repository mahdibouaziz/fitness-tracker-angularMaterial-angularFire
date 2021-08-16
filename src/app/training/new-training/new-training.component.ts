import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercicesSubscription: Subscription;

  constructor(public trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exercicesSubscription =
      this.trainingService.exercisesChanged.subscribe(
        (exercices: Exercise[]) => {
          this.exercises = exercices;
        }
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercicesSubscription.unsubscribe();
  }
}
