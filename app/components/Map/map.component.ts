import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as L from 'leaflet';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytesResumable
} from '@angular/fire/storage';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user$ = this.authService.currentUser$;
  private ankietFormFire!: AngularFirestoreCollection<any>;
  opinionForm!: FormGroup;
  public file: any = {};
  Markercoodrs: any;
  Polygoncoords: any;
  Markers: any;
  Polygon: any;
  name = '';

  private map: L.Map | L.LayerGroup<any> | undefined;

  private initMap(): void {

    this.map = L.map('map', {
      center: L.latLng(52.220392, 21.010893),
      zoom: 19,
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/#map=17/52.22117/21.01113">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    var editableLayers = new L.FeatureGroup();
    this.map.addLayer(editableLayers);

    // this.map.on('click',(e:{
    //   latlng:LatLng
    // }) => {
    //   var coord = e.latlng;
    //   var lat = coord.lat;
    //   var lng = coord.lng;
    //   console.log('click',e.latlng.lat,e.latlng.lng);
    //   var mp = new L.Marker([lat,lng]).addTo(this.map!);
    //   var MarkerFire: Coords = {lat, lng};
    //   console.log(MarkerFire)
    // });

    var options = {
      position: 'topleft' as 'topleft',
      draw: {
        polyline: false as false,
        circle: false as false,
        circlemarker: false as false,
        rectangle: false as false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: 'blue',
            message: '<<strong> you can\'t draw that!'
          },
          shapeOptions: {
            color: 'blue'
          }
        },
      },
      edit: {
        featureGroup: editableLayers,
        remove: true
      }
    };



    L.Control.Zoom
    var drawControl = new L.Control.Draw(options);
    this.map.addControl(drawControl);
    this.map.on(L.Draw.Event.CREATED, (e) => {
      let type = (e as L.DrawEvents.Created).layerType
      if (type === "polygon") {
        this.Polygon = e.layer.getLatLngs().toString();
        // console.log(type + ' ' + this.Polygoncoords);
        this.Polygoncoords = this.Polygon;
        // console.log(typeof (this.Polygon))
      }
      else {
        this.Markers = e.layer.getLatLng().toString();
        // console.log(type + ' ' + this.Markercoodrs);
        this.Markercoodrs = this.Markers.toString();
        // console.log(typeof (this.Markercoodrs));
      }
      const layer = (e as L.DrawEvents.Created).layer;
      editableLayers.addLayer(layer);
    });

    const polygon = L.polygon([
      [52.220127, 21.004534],
      [52.223122, 21.004426],
      [52.222825, 21.008764],
      [52.222301, 21.009017],
      [52.220438, 21.011678],
      [52.220223, 21.011885],
      [52.219918, 21.011780]
    ], {
      color: '#70BDD0',
      weight: 10,
      fillOpacity: 0.2,
    }).addTo(this.map);
  }

  constructor(private authService: AuthenticationService, private observer: BreakpointObserver,
    private formBuilder: FormBuilder, private firestore: AngularFirestore, public storage: Storage) { }


  upload(event: any) {
    this.file = event.target.files[0]
  }

  ngOnInit(): void { }

  onValueChange(event: Event): void {
    const value = (event.target as any).value;
    this.name = value;
    // console.log(this.name);
  }

  ngDoCheck(): void {
    this.ankietFormFire = this.firestore.collection('Like');
    this.opinionForm = this.formBuilder.group({
      marker: [this.Markercoodrs, Validators.required],
      poligon: [this.Polygoncoords, Validators.required],
      comment: [this.name],
      nazwa: [this.file.name]
    });
  }

  submitData(value: any) {
    // console.log(value);
    this.ankietFormFire.add(value);
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file)
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.initMap();
  }
}

