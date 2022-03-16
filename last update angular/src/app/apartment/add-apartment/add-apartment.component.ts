import { img,user_info } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apart,cities } from 'src/app/_models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-addApartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.scss']
})
export class AddApartmentComponent implements OnInit {
  user_info:user_info

  imagesUrl !: File
  img!: any

  gov: cities[] = [];
  cities: cities[] = [];
  test = true;

  constructor(private http: HttpClient, private data: DataService) { }


  ngOnInit() {
    this.getcities();
  }


  getcities() {
    this.http.get('http://127.0.0.1:8000/api/governates').subscribe(data => {

      for (let i = 0; i < data['data'].length; i++) {
        this.gov[i] = (data['data'][i]);
      }
    });

  }



  choosegov(event: any) {
    this.http.get('http://127.0.0.1:8000/api/findcities/'.concat(event.target.value)).subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.cities[i] = (data['data'][i]);
      }
    });
    this.test = true;
  }




  addApartment(data: any) {

    let db = new FormData()

    for (const key in data) {

      db.append(key, data[key])
    }
    console.log(this.imagesUrl);

    // let owner_id:any= 1;
    db.append('images', this.imagesUrl)
    db.append('owner_id', JSON.parse(localStorage.getItem('user_info'))['id'])
    db.append('city_id', data['state'])

    this.http.post('http://127.0.0.1:8000/api/apartements', db,{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

  }

  selectFiles(event): void {
    this.imagesUrl = event.target.files[0]
    console.log(this.imagesUrl);
  }

}
