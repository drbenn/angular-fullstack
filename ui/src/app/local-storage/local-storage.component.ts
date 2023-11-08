import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.scss']
})
export class LocalStorageComponent implements OnInit {

  newKeyVal: NgForm | undefined;
  newValVal: NgForm | undefined; 
  removeKeyVal: NgForm | undefined;
  getKeyVal: NgForm | undefined;
  allKeys!: any;
  allStorage!: any;
  singleStorageItem!: any;

  ngOnInit() {
    localStorage.setItem('myData', 'Hello, world!');
    this.ifNotExistAddJsonToLocal();
  }

  private ifNotExistAddJsonToLocal() {
    if (!localStorage.getItem('jabroni')) {
      localStorage.setItem('jabroni', '{"rock": ["peoples elbow","rock bottom"], "stoneCold":"Stunner"}')
    }
    const jabroni = localStorage.getItem('jabroni');
    if (typeof jabroni === 'string') {
      console.warn('Local storage JSON parsed to Object');
      console.log(JSON.parse(jabroni));
    }
  }

  protected getAllLocalStorageKeys() {
    this.allKeys = Object.keys(localStorage);
  }

  protected getAllLocalStorage() {
    this.allStorage = localStorage;
  }

  protected getOneLocalStorageItem(key: HTMLInputElement) {
    this.singleStorageItem = localStorage.getItem(key.value.toString())
  }

  protected addLocalStorageItem(key: HTMLInputElement, val: HTMLInputElement) {
    console.log(key.value.toString(), val.value.toString());
    
    localStorage.setItem(key.value, val.value);
  }

  protected removeByKey(key: HTMLInputElement) {
    localStorage.removeItem(key.value);
  }
}
