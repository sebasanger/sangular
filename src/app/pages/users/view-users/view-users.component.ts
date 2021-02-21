import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { ViewUsersDataSource, ViewUsersItem } from './view-users-datasource';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements AfterViewInit, OnInit {
  constructor(private userService: UserService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewUsersItem>;
  dataSource!: ViewUsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fullName', 'roles', 'email'];

  ngOnInit() {
    this.dataSource = new ViewUsersDataSource();
    this.userService.getAllUsers('').subscribe((res) => {
      this.dataSource.data = res.content;
    });
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
