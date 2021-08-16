import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns = ['name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.finishedExercisesSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises;
        }
      );

    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.finishedExercisesSubscription.unsubscribe();
  }

  doFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
