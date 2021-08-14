import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  constructor(public trainignService: TrainingService) {}

  ngOnInit(): void {}

  onStartTraining(): void {
    this.trainignService.ongoingTraining = true;
  }
}
