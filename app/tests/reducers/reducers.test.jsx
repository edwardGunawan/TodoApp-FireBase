var expect = require('expect');
var df = require('deep-freeze-strict'); // to test pure function, so any modification to the action or state or any attribute it will throw an error

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: "SET_SEARCH_TEXT",
        searchText: 'dog'
      };

      var res = reducers.searchTextReducer(df(''), df(action)); // through passing any of the og state it will failed

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', ()=> {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(false),df(action));

      expect(res).toEqual(true);
    })
  })
});
