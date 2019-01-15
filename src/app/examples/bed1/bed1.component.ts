import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import { MatDialog } from '@angular/material';
import { AddObjectDialogComponent } from './addObject-dialog.component';
import 'ag-grid-enterprise';

@Component({
  selector: 'anms-bed1',
  templateUrl: './bed1.component.html',
  styleUrls: ['./bed1.component.css']
})
export class Bed1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  private groupRowAggNodes;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFO().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  addObject(params) {
    // console.log(params);
    if (params.colDef.headerName === 'PAP' && params.data !== undefined) {
      const selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows);
      const dialogRef = this.dialog.open(AddObjectDialogComponent, {
        data: { data: selectedRows[0], gridApi: this.gridApi }
      });
      return dialogRef.afterClosed();
    }
  }

  currencyFormatter(params) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  percentageFormatter(params) {
    const number = parseFloat(params.value) * 100;
    if (number === undefined || isNaN(number)) {
      return 0;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  constructor(private mfoService: MfoService, private dialog: MatDialog) {
    this.rowSelection = 'single';
    this.columnDefs = [
      // {
      //   headerName: "Group",
      //   cellRenderer: "agGroupCellRenderer",
      //   showRowGroup: true,
      //   pinned: 'left',
      //   field: 'mfo_name'
      // },
      {
        headerName: 'header_main',
        field: 'header_main',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_program',
        field: 'header_program',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_mfo',
        field: 'header_mfo',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_indicator',
        field: 'header_indicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_subindicator',
        field: 'header_subindicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'mfo_id',
        field: 'mfo_id',
        width: 120,
        rowGroup: true,
        hide: true
      },

      { headerName: 'Description', field: 'name', width: 150, pinned: 'left' },
      { headerName: 'UACS Object Code', field: 'object_id', width: 100 },
      {
        headerName: 'Original Allotment',
        field: 'budget',
        width: 100,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Adjustment',
        field: 'adjustment',
        width: 100,
        editable: true,
        aggFunc: 'sum',
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Adjusted Allotment',
        field: 'adjusted',
        width: 100,
        cellStyle: { color: 'white', 'background-color': '#b23c9a' },
        aggFunc: 'sum',
        valueGetter: 'Number(data.budget) + Number(data.adjustment) ',
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn'
      },
      {
        headerName: 'Jan',
        field: 'jan',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Feb',
        field: 'feb',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Mar',
        field: 'mar',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Q1',
        field: 'Q1',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: 'Number(data.jan) + Number(data.feb) + Number(data.mar)',
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Apr',
        field: 'apr',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'May',
        field: 'may',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Jun',
        field: 'jun',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Q2',
        field: 'Q2',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: 'Number(data.apr) + Number(data.may) + Number(data.jun)',
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Jul',
        field: 'jul',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Aug',
        field: 'aug',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Sep',
        field: 'sep',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Q3',
        field: 'Q3',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: 'Number(data.jul) + Number(data.aug) + Number(data.sep)',
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Oct',
        field: 'oct',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Nov',
        field: 'nov',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Dec',
        field: 'decm',
        width: 70,
        editable: true,
        valueFormatter: this.currencyFormatter,
        type: 'valueColumn',
        onCellValueChanged: function(event) {
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          } else {
            mfoService
              .updateAllotment(
                event.data.id,
                event.newValue,
                event.colDef.field
              )
              .subscribe(data => {
                console.log(data);
              });
          }
        }
      },
      {
        headerName: 'Q4',
        field: 'Q4',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' },
        valueGetter: 'Number(data.oct) + Number(data.nov) + Number(data.decm)',
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Total Obligations',
        field: 'to',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#ef7109' },
        valueGetter:
          'Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)',
        valueFormatter: this.currencyFormatter,
        type: 'totalColumn'
      },
      {
        headerName: 'Unobligated',
        field: 'un',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#e83525' },
        valueGetter:
          '(Number(data.budget) + Number(data.adjustment)) - (Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm))',
        valueFormatter: this.currencyFormatter,
        type: 'totalColumn'
      },
      {
        headerName: '% Utilization',
        field: 'fu',
        width: 70,
        valueGetter:
          '(Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.decm)) / (Number(data.budget) + Number(data.adjustment))',
        valueFormatter: this.percentageFormatter,
        type: 'totalColumn'
      }
    ];
    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };
    this.columnTypes = {
      valueColumn: {
        width: 100,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell',
        valueFormatter: this.currencyFormatter
      },
      totalColumn: {
        aggFunc: 'sum',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell',
        valueFormatter: this.currencyFormatter
      }
    };
    this.components = { simpleCellRenderer: getSimpleCellRenderer() };

    this.groupRowAggNodes = function groupRowAggNodes(nodes) {
      var result = {
        to:0,fu:0,un:0,
        adjusted: 0,
        budget:0,
        adjustment:0,
        Q1:0,
        Q2:0,
        Q3:0,
        Q4:0,
        jan:0,
        feb:0,
        mar:0,
        apr:0,
        may:0,
        jun:0,
        jul:0,
        aug:0,
        sep:0,
        oct:0,
        nov:0,
        decm:0,
      };
      nodes.forEach(function(node) {
        var data = node.group ? node.aggData : node.data;
        //console.log(data);
        if (typeof data.adjustment === "number") {
          result.adjustment += data.adjustment;
        }
        if (typeof data.budget === "number") {
          result.budget += data.budget;
        }
        if (typeof data.budget === "number"&&typeof data.adjustment === "number") {
          result.adjusted += data.budget+ data.adjustment;
        }
        if (typeof data.jan === "number") {
          result.jan += data.jan;
        }
        if (typeof data.feb === "number") {
          result.feb += data.feb;
        }
        if (typeof data.mar === "number") {
          result.mar += data.mar;
        }
        if (typeof data.apr === "number") {
          result.apr += data.apr;
        }
        if (typeof data.may === "number") {
          result.may += data.may;
        }
        if (typeof data.jun === "number") {
          result.jun += data.jun;
        }
        if (typeof data.jul === "number") {
          result.jul += data.jul;
        }
        if (typeof data.aug === "number") {
          result.aug += data.aug;
        }
        if (typeof data.sep === "number") {
          result.sep += data.sep;
        }
        if (typeof data.oct === "number") {
          result.oct += data.oct;
        }
        if (typeof data.nov === "number") {
          result.nov += data.nov;
        }
        if (typeof data.decm === "number") {
          result.decm += data.decm;
        }
        result.Q1 += Number(data.jan) + Number(data.feb) + Number(data.mar);
        result.Q2 += Number(data.apr) + Number(data.may) + Number(data.jun);
        result.Q3 += Number(data.jul) + Number(data.aug) + Number(data.sep);
        result.Q4 += Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.to+=Number(data.jan) + Number(data.feb) + Number(data.mar)+Number(data.apr) + Number(data.may) + Number(data.jun)+Number(data.jul) + Number(data.aug) + Number(data.sep)+Number(data.oct) + Number(data.nov) + Number(data.decm);
        result.un = result.adjusted-result.to;
        result.fu = result.to/result.adjusted;
        /*
        if (typeof data.silver === "number") {
          result.silver += data.silver;
          result.silverPie += data.silver * Math.PI;
        }
        if (typeof data.bronze === "number") {
          result.bronze += data.bronze;
          result.bronzePie += data.bronze * Math.PI;
        }*/
      });
      return result;
    };
  }

  ngOnInit() {}
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    // console.log(params.node);
    if (params.node.group && params.node.field === 'mfo_id') {
      // alert(params.node.field);
      tempDiv.innerHTML =
        '<span>' + params.node.allLeafChildren[0].data.mfo_name + '</span>';
    } else if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="font-weight: bold">' + params.value + '</span>';
    } else {
      // console.log(params);
      tempDiv.innerHTML = '<span>' + params.value + '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}