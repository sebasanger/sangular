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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ViewUsersItem>;
  dataSource: ViewUsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fullName', 'roles', 'email'];

  ngOnInit() {
    this.dataSource = new ViewUsersDataSource();
    this.userService.getAllUsers('', 0, 3, 'id', 'desc').subscribe((res) => {
      this.dataSource.data = res.content;
      this.dataSource.paginator.pageIndex = 0;
      this.paginator.length = res.size;
      console.log(res.content);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
