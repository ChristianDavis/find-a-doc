var React = require('react');
var FindADocForm = require('FindADocForm');
var ZipSearchMessage = require('ZipSearchMessage');
var findFips = require('findFips');
var findPlans = require('findPlans');

var FindADoc = React.createClass({
  getInitialState: function () {
    return {
      searchZip: '',
      fipsCode: '',
      carriersList: '',
      hiosIssuerId: '',
      plansList: '',
      carrierInputVisible: false,
      planInputVisible: false,
      submitVisible: false
    }
  },
  getDefaultProps: function () {
    return {
      visible: false
    }
  },
  handleSearchZip: function (searchZip) {
    var that = this;
    this.setState({
      searchZip: searchZip
    });
    findFips.getFipsCode(searchZip).then(function(fipsCode){
      that.setState({
        searchZip: searchZip,
        fipsCode: fipsCode
      });
      findPlans.getPlans(searchZip, fipsCode).then(function(plansByCarrier){

        var carriersList = [];

        for (var carrier in plansByCarrier){
          carriersList.push(carrier)
        };
        console.log(carriersList);

        var plansList = [];

        for (var carrier in plansByCarrier) {
          plansList.push
        }


        that.setState({
          carriersList: carriersList
        });
      });
    }, function(e){
      that.setState({
        errorMessage: e.message
      });
    });

  },
  render: function() {
    var {searchZip, fipsCode} = this.state;

    function renderMessage(){
      return <ZipSearchMessage searchZip={searchZip}/>
    }
    return (
      <div>
        <div className='row'>
          <div className='columns small-11 medium-6 large-4 small-centered'>
            <h3 className='page-title'>Find A Doctor</h3>
            <FindADocForm onSearchZip={this.handleSearchZip} />
            {renderMessage()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FindADoc;
