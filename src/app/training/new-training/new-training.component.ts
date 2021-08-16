import { Component, OnInit } from '@angular/core';
import { Exercice } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercices: Exercice[];
  selectedExerciceId: string;

  constructor(public trainignService: TrainingService) {}

  ngOnInit(): void {
    this.exercices = this.trainignService.getAvailableExercices();
  }

  selectCurrentExerciceId(exerciceId: any) {
    this.selectedExerciceId = exerciceId;
    // console.log(this.selectedExerciceId);
  }

  onStartTraining(): void {
    if (this.selectedExerciceId) {
      this.trainignService.ongoingTraining = true;
      this.trainignService.startExercice(this.selectedExerciceId);
    }
  }
}
