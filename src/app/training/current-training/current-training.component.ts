import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercice } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  runningExercice: Exercice;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.runningExercice = this.trainingService.getRunningExercice();
    // console.log(this.runningExercice);
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = (this.runningExercice.duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercice();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        this.trainingService.ongoingTraining = false;
        this.trainingService.cancelExercice(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
