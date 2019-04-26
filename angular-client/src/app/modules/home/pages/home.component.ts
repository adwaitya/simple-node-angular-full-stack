import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { User } from 'src/app/core/models/user.model';
import { ButtonRenderComponent } from './render/button-render/button-render.component';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    users: User[];
    rowDataClicked1 = {};
    rowDataClicked2 = {};
    frameworkComponents: any;
    columnDefs = [
        {headerName: 'Name', field: 'name', sortable: true, filter: true,
        cellRenderer: function(params) {
            console.log(params.data._id);
            return '<a [routerLink]="/profile/">' + params.value + '</a>';
        }},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Created At', field: 'createdAt', sortable: true, filter: true},
        {headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true},
        {
            headerName: 'Edit',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: this.editUser.bind(this),
              label: 'Edit'
            }
        },
        {
            headerName: 'Delete',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: this.deleteUser.bind(this),
              label: 'Delete'
            }
        },
    ];
    gridOptions: GridOptions = {
        pagination: true,
        rowModelType: 'infinite',
        cacheBlockSize: 20,
        paginationPageSize: 20
      };
    constructor(private profileService: ProfileService) {
        this.frameworkComponents = {
            buttonRenderer: ButtonRenderComponent,
          };
    }
    ngOnInit() {
        console.log('Home compoent');
        this.getAllUsers();
    }

    getAllUsers() {
         this.profileService.getAllUsers().subscribe(data => {
             this.users = data.data;
         });
    }

    editUser(e) {
        this.rowDataClicked1 = e.rowData;
        console.log(this.rowDataClicked1);
      }
    deleteUser(e) {
        const user = e.rowData;
        this.profileService.deleteUser(user._id).subscribe(data => {
            if (data) {
                this.getAllUsers();
            }
        });
      }
}
