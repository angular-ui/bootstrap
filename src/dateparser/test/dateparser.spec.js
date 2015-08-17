describe('date parser', function() {
  var dateParser;

  beforeEach(module('ui.bootstrap.dateparser'));
  beforeEach(inject(function (_dateParser_) {
    dateParser = _dateParser_;
  }));

  function expectParse(input, format, date) {
    expect(dateParser.parse(input, format)).toEqual(date);
  }

  describe('with custom formats', function() {
    it('should work correctly for `dd`, `MM`, `yyyy`', function() {
      expectParse('17.11.2013', 'dd.MM.yyyy', new Date(2013, 10, 17, 0));
      expectParse('31.12.2013', 'dd.MM.yyyy', new Date(2013, 11, 31, 0));
      expectParse('08-03-1991', 'dd-MM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('03/05/1980', 'MM/dd/yyyy', new Date(1980, 2, 5, 0));
      expectParse('10.01/1983', 'dd.MM/yyyy', new Date(1983, 0, 10, 0));
      expectParse('11-09-1980', 'MM-dd-yyyy', new Date(1980, 10, 9, 0));
      expectParse('2011/02/05', 'yyyy/MM/dd', new Date(2011, 1, 5, 0));
    });

    it('should work correctly for `yy`', function() {
      expectParse('17.11.13', 'dd.MM.yy', new Date(2013, 10, 17, 0));
      expectParse('02-05-11', 'dd-MM-yy', new Date(2011, 4, 2, 0));
      expectParse('02/05/80', 'MM/dd/yy', new Date(2080, 1, 5, 0));
      expectParse('55/02/05', 'yy/MM/dd', new Date(2055, 1, 5, 0));
      expectParse('11-08-13', 'dd-MM-yy', new Date(2013, 7, 11, 0));
    });

    it('should work correctly for `M`', function() {
      expectParse('8/11/2013', 'M/dd/yyyy', new Date(2013, 7, 11, 0));
      expectParse('07.11.05', 'dd.M.yy', new Date(2005, 10, 7, 0));
      expectParse('02-5-11', 'dd-M-yy', new Date(2011, 4, 2, 0));
      expectParse('2/05/1980', 'M/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/2/05', 'yyyy/M/dd', new Date(1955, 1, 5, 0));
      expectParse('02-5-11', 'dd-M-yy', new Date(2011, 4, 2, 0));
    });

    it('should work correctly for `MMM`', function() {
      expectParse('30.Sep.10', 'dd.MMM.yy', new Date(2010, 8, 30, 0));
      expectParse('02-May-11', 'dd-MMM-yy', new Date(2011, 4, 2, 0));
      expectParse('Feb/05/1980', 'MMM/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/Feb/05', 'yyyy/MMM/dd', new Date(1955, 1, 5, 0));
    });

    it('should work correctly for `MMMM`', function() {
      expectParse('17.November.13', 'dd.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('05-March-1980', 'dd-MMMM-yyyy', new Date(1980, 2, 5, 0));
      expectParse('February/05/1980', 'MMMM/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1949/December/20', 'yyyy/MMMM/dd', new Date(1949, 11, 20, 0));
    });

    it('should work correctly for `d`', function() {
      expectParse('17.November.13', 'd.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991', 'd-MMMM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980', 'MMMM/d/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5', 'yyyy/MMMM/d', new Date(1955, 1, 5, 0));
      expectParse('11-08-13', 'd-MM-yy', new Date(2013, 7, 11, 0));
    });

    it('should work correctly for `HH`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.HH', new Date(2015, 2, 22, 22));
      expectParse('8-March-1991-11', 'd-MMMM-yyyy-HH', new Date(1991, 2, 8, 11));
      expectParse('February/5/1980/00', 'MMMM/d/yyyy/HH', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5 03', 'yyyy/MMMM/d HH', new Date(1955, 1, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy HH', new Date(2013, 7, 11, 23));
    });

    it('should work correctly for `hh`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.hh', undefined);
      expectParse('22.March.15.12', 'd.MMMM.yy.hh', new Date(2015, 2, 22, 12));
      expectParse('8-March-1991-11', 'd-MMMM-yyyy-hh', new Date(1991, 2, 8, 11));
      expectParse('February/5/1980/00', 'MMMM/d/yyyy/hh', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5 03', 'yyyy/MMMM/d hh', new Date(1955, 1, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy hh', undefined);
      expectParse('11-08-13 09', 'd-MM-yy hh', new Date(2013, 7, 11, 9));
    });

    it('should work correctly for `H`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.H', new Date(2015, 2, 22, 22));
      expectParse('8-March-1991-11', 'd-MMMM-yyyy-H', new Date(1991, 2, 8, 11));
      expectParse('February/5/1980/0', 'MMMM/d/yyyy/H', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5 3', 'yyyy/MMMM/d H', new Date(1955, 1, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy H', new Date(2013, 7, 11, 23));
    });

    it('should work correctly for `h`', function() {
      expectParse('22.March.15.12', 'd.MMMM.yy.h', new Date(2015, 2, 22, 12));
      expectParse('8-March-1991-11', 'd-MMMM-yyyy-h', new Date(1991, 2, 8, 11));
      expectParse('February/5/1980/0', 'MMMM/d/yyyy/h', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5 3', 'yyyy/MMMM/d h', new Date(1955, 1, 5, 3));
      expectParse('11-08-13 3', 'd-MM-yy h', new Date(2013, 7, 11, 3));
    });

    it('should work correctly for `mm`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.mm', new Date(2015, 2, 22, 0, 22));
      expectParse('8-March-1991-59', 'd-MMMM-yyyy-mm', new Date(1991, 2, 8, 0, 59));
      expectParse('February/5/1980/00', 'MMMM/d/yyyy/mm', new Date(1980, 1, 5, 0, 0));
      expectParse('1955/February/5 03', 'yyyy/MMMM/d mm', new Date(1955, 1, 5, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy mm', new Date(2013, 7, 11, 0, 46));
      expectParse('22.March.15.22:33', 'd.MMMM.yy.HH:mm', new Date(2015, 2, 22, 22, 33));
      expectParse('22.March.15.2:01', 'd.MMMM.yy.H:mm', new Date(2015, 2, 22, 2, 1));
    });

    it('should work correctly for `m`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.m', new Date(2015, 2, 22, 0, 22));
      expectParse('8-March-1991-59', 'd-MMMM-yyyy-m', new Date(1991, 2, 8, 0, 59));
      expectParse('February/5/1980/0', 'MMMM/d/yyyy/m', new Date(1980, 1, 5, 0, 0));
      expectParse('1955/February/5 3', 'yyyy/MMMM/d m', new Date(1955, 1, 5, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy m', new Date(2013, 7, 11, 0, 46));
      expectParse('22.March.15.22:3', 'd.MMMM.yy.HH:m', new Date(2015, 2, 22, 22, 3));
      expectParse('22.March.15.2:1', 'd.MMMM.yy.H:m', new Date(2015, 2, 22, 2, 1));
    });

    it('should work correctly for `sss`', function() {
      expectParse('22.March.15.123', 'd.MMMM.yy.sss', new Date(2015, 2, 22, 0, 0, 0, 123));
      expectParse('8-March-1991-059', 'd-MMMM-yyyy-sss', new Date(1991, 2, 8, 0, 0, 0, 59));
      expectParse('February/5/1980/000', 'MMMM/d/yyyy/sss', new Date(1980, 1, 5, 0, 0, 0));
      expectParse('1955/February/5 003', 'yyyy/MMMM/d sss', new Date(1955, 1, 5, 0, 0, 0, 3));
      expectParse('11-08-13 046', 'd-MM-yy sss', new Date(2013, 7, 11, 0, 0, 0, 46));
      expectParse('22.March.15.22:33:044', 'd.MMMM.yy.HH:mm:sss', new Date(2015, 2, 22, 22, 33, 0, 44));
      expectParse('22.March.15.0:0:001', 'd.MMMM.yy.H:m:sss', new Date(2015, 2, 22, 0, 0, 0, 1));
    });

    it('should work correctly for `ss`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.ss', new Date(2015, 2, 22, 0, 0, 22));
      expectParse('8-March-1991-59', 'd-MMMM-yyyy-ss', new Date(1991, 2, 8, 0, 0, 59));
      expectParse('February/5/1980/00', 'MMMM/d/yyyy/ss', new Date(1980, 1, 5, 0, 0, 0));
      expectParse('1955/February/5 03', 'yyyy/MMMM/d ss', new Date(1955, 1, 5, 0, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy ss', new Date(2013, 7, 11, 0, 0, 46));
      expectParse('22.March.15.22:33:44', 'd.MMMM.yy.HH:mm:ss', new Date(2015, 2, 22, 22, 33, 44));
      expectParse('22.March.15.0:0:01', 'd.MMMM.yy.H:m:ss', new Date(2015, 2, 22, 0, 0, 1));
    });

    it('should work correctly for `s`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.s', new Date(2015, 2, 22, 0, 0, 22));
      expectParse('8-March-1991-59', 'd-MMMM-yyyy-s', new Date(1991, 2, 8, 0, 0, 59));
      expectParse('February/5/1980/0', 'MMMM/d/yyyy/s', new Date(1980, 1, 5, 0, 0, 0));
      expectParse('1955/February/5 3', 'yyyy/MMMM/d s', new Date(1955, 1, 5, 0, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy s', new Date(2013, 7, 11, 0, 0, 46));
      expectParse('22.March.15.22:33:4', 'd.MMMM.yy.HH:mm:s', new Date(2015, 2, 22, 22, 33, 4));
      expectParse('22.March.15.22:3:4', 'd.MMMM.yy.HH:m:s', new Date(2015, 2, 22, 22, 3, 4));
    });

    it('should work correctly for `a`', function() {
      expectParse('22.March.15.10AM', 'd.MMMM.yy.hha', new Date(2015, 2, 22, 10));
      expectParse('22.March.15.10PM', 'd.MMMM.yy.hha', new Date(2015, 2, 22, 22));
      expectParse('8-March-1991-11AM', 'd-MMMM-yyyy-hha', new Date(1991, 2, 8, 11));
      expectParse('8-March-1991-11PM', 'd-MMMM-yyyy-hha', new Date(1991, 2, 8, 23));
      expectParse('February/5/1980/12AM', 'MMMM/d/yyyy/hha', new Date(1980, 1, 5, 0));
      expectParse('February/5/1980/12PM', 'MMMM/d/yyyy/hha', new Date(1980, 1, 5, 12));
      expectParse('1955/February/5 03AM', 'yyyy/MMMM/d hha', new Date(1955, 1, 5, 3));
      expectParse('1955/February/5 03PM', 'yyyy/MMMM/d hha', new Date(1955, 1, 5, 15));
      expectParse('11-08-13 09AM', 'd-MM-yy hha', new Date(2013, 7, 11, 9));
      expectParse('11-08-13 09PM', 'd-MM-yy hha', new Date(2013, 7, 11, 21));
    });
  });

  describe('with predefined formats', function() {
    it('should work correctly for `shortDate`', function() {
      expectParse('9/3/10', 'shortDate', new Date(2010, 8, 3, 0));
    });

    it('should work correctly for `mediumDate`', function() {
      expectParse('Sep 3, 2010', 'mediumDate', new Date(2010, 8, 3, 0));
    });

    it('should work correctly for `longDate`', function() {
      expectParse('September 3, 2010', 'longDate', new Date(2010, 8, 3, 0));
    });

    it('should work correctly for `fullDate`', function() {
      expectParse('Friday, September 3, 2010', 'fullDate', new Date(2010, 8, 3, 0));
    });
  });

  describe('with edge case', function() {
    it('should not work for invalid number of days in February', function() {
      expect(dateParser.parse('29.02.2013', 'dd.MM.yyyy')).toBeUndefined();
    });

    it('should not work for 0 number of days', function() {
      expect(dateParser.parse('00.02.2013', 'dd.MM.yyyy')).toBeUndefined();
    });

    it('should work for 29 days in February for leap years', function() {
      expectParse('29.02.2000', 'dd.MM.yyyy', new Date(2000, 1, 29, 0));
    });

    it('should not work for 31 days for some months', function() {
      expect(dateParser.parse('31-04-2013', 'dd-MM-yyyy')).toBeUndefined();
      expect(dateParser.parse('November 31, 2013', 'MMMM d, yyyy')).toBeUndefined();
    });

    it('should work when base date is a string', function() {
      expect(dateParser.parse('01-02-2034', 'dd-MM-yyyy', '05-06-2078')).toEqual(new Date(2034, 1, 1));
    });

    it('should work when base date is an invalid date', function() {
      expect(dateParser.parse('30-12-2015', 'dd-MM-yyyy', new Date('foo'))).toEqual(new Date(2015, 11, 30));
    });
  });

  it('should not parse non-string inputs', function() {
    expect(dateParser.parse(123456, 'dd.MM.yyyy')).toBe(123456);
    var date = new Date();
    expect(dateParser.parse(date, 'dd.MM.yyyy')).toBe(date);
  });

  it('should not parse if no format is specified', function() {
    expect(dateParser.parse('21.08.1951', '')).toBe('21.08.1951');
  });
});
