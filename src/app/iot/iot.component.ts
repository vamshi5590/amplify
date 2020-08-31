import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.css']
})
export class IotComponent implements OnInit {
  private subs = new SubSink();
  palceholder = 'Please upload the data file in CSV format to plot the Chart';
  filesForm = this.formBuilder.group({
    fileToUpload: ['']
  });
  getfile: any;
  data: any;
  ploturl: any;
  scatter1 : any;
  scatter2: any;
  scatter3: any;
  linearurl: any;
  file: any;
  datain: number[];
  dataout: number[];
  showspinner = false;
  showcanvas = false;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels = [];

  constructor(private formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit() {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.showcanvas = false;
      this.file = event.target.files[0];
      this.filesForm.get('fileToUpload').setValue(this.file);
      this.submitfile();
    }
  }

  submitfile() {
    this.showspinner = true;
    const formData = new FormData();
    formData.append('fileToUpload', this.filesForm.get('fileToUpload').value);

    this.subs.sink = this.service.postfile(formData).subscribe(res => {
      this.data = res;
       console.log(this.data);
       this.ploturl = this.data.plot_url;
       this.linearurl = this.data.linear_url;
       this.scatter1 = this.data.scatter.scatter1;
       this.scatter2 = this.data.scatter.scatter2;
       this.scatter3 = this.data.scatter.scatter3;

    //   this.datain = this.data.data.data_in;
    //   this.dataout = this.data.data.data_out;
       this.showspinner = false;
       this.showcanvas = true;
    //   this.datain = this.datain.map(function(each_element){
    //     return Number(each_element.toFixed(2));
    //   });
    //   this.dataout = this.dataout.map(function(each_element){
    //     return Number(each_element.toFixed(2));
    //   });
    //  this.lineChartData = [
    //   { data: this.datain, label: 'data in ' },
    //   { data: this.dataout, label: 'data out' },
    //   ];
    //   this.lineChartLabels = this.datain;
      
      // console.log(this.datain, 'data in',  this.dataout, 'dataout');
    });
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }


    
  
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: ''
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    // this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    this.chart.update();
  }


}
