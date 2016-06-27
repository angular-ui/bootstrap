describe('date parser', function() {
  var dateParser, oldDate;

  beforeEach(module('ui.bootstrap.dateparser'));
  beforeEach(inject(function (uibDateParser) {
    dateParser = uibDateParser;
    oldDate = new Date(1, 2, 6);
    oldDate.setFullYear(1);
  }));

  function expectFilter(date, format, display) {
    expect(dateParser.filter(date, format)).toEqual(display);
  }

  function expectParse(input, format, date) {
    expect(dateParser.parse(input, format)).toEqual(date);
  }

  function expectBaseParse(input, format, baseDate, date) {
    expect(dateParser.parse(input, format, baseDate)).toEqual(date);
  }

  describe('filter', function() {
    it('should work correctly for `dd`, `MM`, `yyyy`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'dd.MM.yyyy', '17.11.2013');
      expectFilter(new Date(2013, 11, 31, 0), 'dd.MM.yyyy', '31.12.2013');
      expectFilter(new Date(1991, 2, 8, 0), 'dd-MM-yyyy', '08-03-1991');
      expectFilter(new Date(1980, 2, 5, 0), 'MM/dd/yyyy', '03/05/1980');
      expectFilter(new Date(1983, 0, 10, 0), 'dd.MM/yyyy', '10.01/1983');
      expectFilter(new Date(1980, 10, 9, 0), 'MM-dd-yyyy', '11-09-1980');
      expectFilter(new Date(2011, 1, 5, 0), 'yyyy/MM/dd', '2011/02/05');
      expectFilter(oldDate, 'yyyy/MM/dd', '0001/03/06');
    });

    it('should work correctly for `yy`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'dd.MM.yy', '17.11.13');
      expectFilter(new Date(2011, 4, 2, 0), 'dd-MM-yy', '02-05-11');
      expectFilter(new Date(2080, 1, 5, 0), 'MM/dd/yy', '02/05/80');
      expectFilter(new Date(2055, 1, 5, 0), 'yy/MM/dd', '55/02/05');
      expectFilter(new Date(2013, 7, 11, 0), 'dd-MM-yy', '11-08-13');
    });

    it('should work correctly for `y`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'dd.MM.y', '17.11.2013');
      expectFilter(new Date(2013, 11, 31, 0), 'dd.MM.y', '31.12.2013');
      expectFilter(new Date(1991, 2, 8, 0), 'dd-MM-y', '08-03-1991');
      expectFilter(new Date(1980, 2, 5, 0), 'MM/dd/y', '03/05/1980');
      expectFilter(new Date(1983, 0, 10, 0), 'dd.MM/y', '10.01/1983');
      expectFilter(new Date(1980, 10, 9, 0), 'MM-dd-y', '11-09-1980');
      expectFilter(new Date(2011, 1, 5, 0), 'y/MM/dd', '2011/02/05');
    });

    it('should work correctly for `MMMM`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'dd.MMMM.yy', '17.November.13');
      expectFilter(new Date(1980, 2, 5, 0), 'dd-MMMM-yyyy', '05-March-1980');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/dd/yyyy', 'February/05/1980');
      expectFilter(new Date(1949, 11, 20, 0), 'yyyy/MMMM/dd', '1949/December/20');
      expectFilter(oldDate, 'yyyy/MMMM/dd', '0001/March/06');
    });

    it('should work correctly for `MMM`', function() {
      expectFilter(new Date(2010, 8, 30, 0), 'dd.MMM.yy', '30.Sep.10');
      expectFilter(new Date(2011, 4, 2, 0), 'dd-MMM-yy', '02-May-11');
      expectFilter(new Date(1980, 1, 5, 0), 'MMM/dd/yyyy', 'Feb/05/1980');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/MMM/dd', '1955/Feb/05');
      expectFilter(oldDate, 'yyyy/MMM/dd', '0001/Mar/06');
    });

    it('should work correctly for `M`', function() {
      expectFilter(new Date(2013, 7, 11, 0), 'M/dd/yyyy', '8/11/2013');
      expectFilter(new Date(2005, 10, 7, 0), 'dd.M.yy', '07.11.05');
      expectFilter(new Date(2011, 4, 2, 0), 'dd-M-yy', '02-5-11');
      expectFilter(new Date(1980, 1, 5, 0), 'M/dd/yyyy', '2/05/1980');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/M/dd', '1955/2/05');
      expectFilter(new Date(2011, 4, 2, 0), 'dd-M-yy', '02-5-11');
    });

    it('should work correctly for `M!`', function() {
      expectFilter(new Date(2013, 7, 11, 0), 'M!/dd/yyyy', '08/11/2013');
      expectFilter(new Date(2005, 10, 7, 0), 'dd.M!.yy', '07.11.05');
      expectFilter(new Date(2011, 4, 2, 0), 'dd-M!-yy', '02-05-11');
      expectFilter(new Date(1980, 1, 5, 0), 'M!/dd/yyyy', '02/05/1980');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/M!/dd', '1955/02/05');
      expectFilter(new Date(2011, 4, 2, 0), 'dd-M!-yy', '02-05-11');
      expectFilter(oldDate, 'yyyy/M!/dd', '0001/03/06');
    });

    it('should work correctly for `d`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy', '17.November.13');
      expectFilter(new Date(1991, 2, 8, 0), 'd-MMMM-yyyy', '8-March-1991');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy', 'February/5/1980');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/MMMM/d', '1955/February/5');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy', '11-08-13');
      expectFilter(oldDate, 'yyyy/MM/d', '0001/03/6');
    });

    it('should work correctly for `d!`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd!.MMMM.yy', '17.November.13');
      expectFilter(new Date(1991, 2, 8, 0), 'd!-MMMM-yyyy', '08-March-1991');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d!/yyyy', 'February/05/1980');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/MMMM/d!', '1955/February/05');
      expectFilter(new Date(2013, 7, 11, 0), 'd!-MM-yy', '11-08-13');
      expectFilter(oldDate, 'yyyy/MM/d!', '0001/03/06');
    });

    it('should work correctly for `EEEE`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'EEEE.d.MMMM.yy', 'Sunday.17.November.13');
      expectFilter(new Date(1991, 2, 8, 0), 'd-EEEE-MMMM-yyyy', '8-Friday-March-1991');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/EEEE', 'February/5/1980/Tuesday');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/EEEE/MMMM/d', '1955/Saturday/February/5');
    });

    it('should work correctly for `EEE`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'EEE.d.MMMM.yy', 'Sun.17.November.13');
      expectFilter(new Date(1991, 2, 8, 0), 'd-EEE-MMMM-yyyy', '8-Fri-March-1991');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/EEE', 'February/5/1980/Tue');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/EEE/MMMM/d', '1955/Sat/February/5');
    });

    it('should work correctly for `HH`', function() {
      expectFilter(new Date(2015, 2, 22, 22), 'd.MMMM.yy.HH', '22.March.15.22');
      expectFilter(new Date(1991, 2, 8, 11), 'd-MMMM-yyyy-HH', '8-March-1991-11');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/HH', 'February/5/1980/00');
      expectFilter(new Date(1955, 1, 5, 3), 'yyyy/MMMM/d HH', '1955/February/5 03');
      expectFilter(new Date(2013, 7, 11, 23), 'd-MM-yy HH', '11-08-13 23');
    });

    it('should work correctly for `H`', function() {
      expectFilter(new Date(2015, 2, 22, 22), 'd.MMMM.yy.H', '22.March.15.22');
      expectFilter(new Date(1991, 2, 8, 11), 'd-MMMM-yyyy-H', '8-March-1991-11');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/H', 'February/5/1980/0');
      expectFilter(new Date(1955, 1, 5, 3), 'yyyy/MMMM/d H', '1955/February/5 3');
      expectFilter(new Date(2013, 7, 11, 23), 'd-MM-yy H', '11-08-13 23');
    });

    it('should work correctly for `hh`', function() {
      expectFilter(new Date(2015, 2, 22, 12), 'd.MMMM.yy.hh', '22.March.15.12');
      expectFilter(new Date(1991, 2, 8, 11), 'd-MMMM-yyyy-hh', '8-March-1991-11');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/hh', 'February/5/1980/12');
      expectFilter(new Date(1955, 1, 5, 3), 'yyyy/MMMM/d hh', '1955/February/5 03');
      expectFilter(new Date(2013, 7, 11, 9), 'd-MM-yy hh', '11-08-13 09');
    });

    it('should work correctly for `h`', function() {
      expectFilter(new Date(2015, 2, 22, 12), 'd.MMMM.yy.h', '22.March.15.12');
      expectFilter(new Date(1991, 2, 8, 11), 'd-MMMM-yyyy-h', '8-March-1991-11');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/h', 'February/5/1980/12');
      expectFilter(new Date(1955, 1, 5, 3), 'yyyy/MMMM/d h', '1955/February/5 3');
      expectFilter(new Date(2013, 7, 11, 3), 'd-MM-yy h', '11-08-13 3');
    });

    it('should work correctly for `mm`', function() {
      expectFilter(new Date(2015, 2, 22, 0, 22), 'd.MMMM.yy.mm', '22.March.15.22');
      expectFilter(new Date(1991, 2, 8, 0, 59), 'd-MMMM-yyyy-mm', '8-March-1991-59');
      expectFilter(new Date(1980, 1, 5, 0, 0), 'MMMM/d/yyyy/mm', 'February/5/1980/00');
      expectFilter(new Date(1955, 1, 5, 0, 3), 'yyyy/MMMM/d mm', '1955/February/5 03');
      expectFilter(new Date(2013, 7, 11, 0, 46), 'd-MM-yy mm', '11-08-13 46');
      expectFilter(new Date(2015, 2, 22, 22, 33), 'd.MMMM.yy.HH:mm', '22.March.15.22:33');
      expectFilter(new Date(2015, 2, 22, 2, 1), 'd.MMMM.yy.H:mm', '22.March.15.2:01');
    });

    it('should work correctly for `m`', function() {
      expectFilter(new Date(2015, 2, 22, 0, 22), 'd.MMMM.yy.m', '22.March.15.22');
      expectFilter(new Date(1991, 2, 8, 0, 59), 'd-MMMM-yyyy-m', '8-March-1991-59');
      expectFilter(new Date(1980, 1, 5, 0, 0), 'MMMM/d/yyyy/m', 'February/5/1980/0');
      expectFilter(new Date(1955, 1, 5, 0, 3), 'yyyy/MMMM/d m', '1955/February/5 3');
      expectFilter(new Date(2013, 7, 11, 0, 46), 'd-MM-yy m', '11-08-13 46');
      expectFilter(new Date(2015, 2, 22, 22, 3), 'd.MMMM.yy.HH:m', '22.March.15.22:3');
      expectFilter(new Date(2015, 2, 22, 2, 1), 'd.MMMM.yy.H:m', '22.March.15.2:1');
    });

    it('should work correctly for `sss`', function() {
      expectFilter(new Date(2015, 2, 22, 0, 0, 0, 123), 'd.MMMM.yy.sss', '22.March.15.123');
      expectFilter(new Date(1991, 2, 8, 0, 0, 0, 59), 'd-MMMM-yyyy-sss', '8-March-1991-059');
      expectFilter(new Date(1980, 1, 5, 0, 0, 0), 'MMMM/d/yyyy/sss', 'February/5/1980/000');
      expectFilter(new Date(1955, 1, 5, 0, 0, 0, 3), 'yyyy/MMMM/d sss', '1955/February/5 003');
      expectFilter(new Date(2013, 7, 11, 0, 0, 0, 46), 'd-MM-yy sss', '11-08-13 046');
      expectFilter(new Date(2015, 2, 22, 22, 33, 0, 44), 'd.MMMM.yy.HH:mm:sss', '22.March.15.22:33:044');
      expectFilter(new Date(2015, 2, 22, 0, 0, 0, 1), 'd.MMMM.yy.H:m:sss', '22.March.15.0:0:001');
    });

    it('should work correctly for `ss`', function() {
      expectFilter(new Date(2015, 2, 22, 0, 0, 22), 'd.MMMM.yy.ss', '22.March.15.22');
      expectFilter(new Date(1991, 2, 8, 0, 0, 59), 'd-MMMM-yyyy-ss', '8-March-1991-59');
      expectFilter(new Date(1980, 1, 5, 0, 0, 0), 'MMMM/d/yyyy/ss', 'February/5/1980/00');
      expectFilter(new Date(1955, 1, 5, 0, 0, 3), 'yyyy/MMMM/d ss', '1955/February/5 03');
      expectFilter(new Date(2013, 7, 11, 0, 0, 46), 'd-MM-yy ss', '11-08-13 46');
      expectFilter(new Date(2015, 2, 22, 22, 33, 44), 'd.MMMM.yy.HH:mm:ss', '22.March.15.22:33:44');
      expectFilter(new Date(2015, 2, 22, 0, 0, 1), 'd.MMMM.yy.H:m:ss', '22.March.15.0:0:01');
    });

    it('should work correctly for `s`', function() {
      expectFilter(new Date(2015, 2, 22, 0, 0, 22), 'd.MMMM.yy.s', '22.March.15.22');
      expectFilter(new Date(1991, 2, 8, 0, 0, 59), 'd-MMMM-yyyy-s', '8-March-1991-59');
      expectFilter(new Date(1980, 1, 5, 0, 0, 0), 'MMMM/d/yyyy/s', 'February/5/1980/0');
      expectFilter(new Date(1955, 1, 5, 0, 0, 3), 'yyyy/MMMM/d s', '1955/February/5 3');
      expectFilter(new Date(2013, 7, 11, 0, 0, 46), 'd-MM-yy s', '11-08-13 46');
      expectFilter(new Date(2015, 2, 22, 22, 33, 4), 'd.MMMM.yy.HH:mm:s', '22.March.15.22:33:4');
      expectFilter(new Date(2015, 2, 22, 22, 3, 4), 'd.MMMM.yy.HH:m:s', '22.March.15.22:3:4');
    });

    it('should work correctly for `a`', function() {
      expectFilter(new Date(2015, 2, 22, 10), 'd.MMMM.yy.hha', '22.March.15.10AM');
      expectFilter(new Date(2015, 2, 22, 22), 'd.MMMM.yy.hha', '22.March.15.10PM');
      expectFilter(new Date(1991, 2, 8, 11), 'd-MMMM-yyyy-hha', '8-March-1991-11AM');
      expectFilter(new Date(1991, 2, 8, 23), 'd-MMMM-yyyy-hha', '8-March-1991-11PM');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/hha', 'February/5/1980/12AM');
      expectFilter(new Date(1980, 1, 5, 12), 'MMMM/d/yyyy/hha', 'February/5/1980/12PM');
      expectFilter(new Date(1955, 1, 5, 3), 'yyyy/MMMM/d hha', '1955/February/5 03AM');
      expectFilter(new Date(1955, 1, 5, 15), 'yyyy/MMMM/d hha', '1955/February/5 03PM');
      expectFilter(new Date(2013, 7, 11, 9), 'd-MM-yy hha', '11-08-13 09AM');
      expectFilter(new Date(2013, 7, 11, 21), 'd-MM-yy hha', '11-08-13 09PM');
    });

    it('should work correctly for `ww`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy.ww', '17.November.13.47');
      expectFilter(new Date(1991, 2, 8, 0), 'd-MMMM-yyyy-ww', '8-March-1991-10');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/ww', 'February/5/1980/06');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/MMMM/d/ww', '1955/February/5/05');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy ww', '11-08-13 33');
      expectFilter(oldDate, 'yyyy/MM/d ww', '0001/03/6 10');
    });

    it('should work correctly for `w`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy.w', '17.November.13.47');
      expectFilter(new Date(1991, 2, 8, 0), 'd-MMMM-yyyy-w', '8-March-1991-10');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/w', 'February/5/1980/6');
      expectFilter(new Date(1955, 1, 5, 0), 'yyyy/MMMM/d/w', '1955/February/5/5');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy w', '11-08-13 33');
      expectFilter(oldDate, 'yyyy/MM/d w', '0001/03/6 10');
    });

    it('should work correctly for `G`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy.G', '17.November.13.AD');
      expectFilter(new Date(-1991, 2, 8, 0), 'd-MMMM-yyyy-G', '8-March-1991-BC');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/G', 'February/5/1980/AD');
      expectFilter(new Date(-1955, 1, 5, 0), 'yyyy/MMMM/d/G', '1955/February/5/BC');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy G', '11-08-13 AD');
    });

    it('should work correctly for `GG`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy.GG', '17.November.13.AD');
      expectFilter(new Date(-1991, 2, 8, 0), 'd-MMMM-yyyy-GG', '8-March-1991-BC');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/GG', 'February/5/1980/AD');
      expectFilter(new Date(-1955, 1, 5, 0), 'yyyy/MMMM/d/GG', '1955/February/5/BC');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy GG', '11-08-13 AD');
    });

    it('should work correctly for `GGG`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy.GGG', '17.November.13.AD');
      expectFilter(new Date(-1991, 2, 8, 0), 'd-MMMM-yyyy-GGG', '8-March-1991-BC');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/GGG', 'February/5/1980/AD');
      expectFilter(new Date(-1955, 1, 5, 0), 'yyyy/MMMM/d/GGG', '1955/February/5/BC');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy GGG', '11-08-13 AD');
    });

    it('should work correctly for `GGGG`', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'd.MMMM.yy.GGGG', '17.November.13.Anno Domini');
      expectFilter(new Date(-1991, 2, 8, 0), 'd-MMMM-yyyy-GGGG', '8-March-1991-Before Christ');
      expectFilter(new Date(1980, 1, 5, 0), 'MMMM/d/yyyy/GGGG', 'February/5/1980/Anno Domini');
      expectFilter(new Date(-1955, 1, 5, 0), 'yyyy/MMMM/d/GGGG', '1955/February/5/Before Christ');
      expectFilter(new Date(2013, 7, 11, 0), 'd-MM-yy GGGG', '11-08-13 Anno Domini');
    });

    it('should work correctly for literal text', function() {
      expectFilter(new Date(2013, 10, 17, 0), 'dd.MM.yyyy foo', '17.11.2013 foo');
    });
  });

  describe('with custom formats', function() {
    it('should work correctly for `dd`, `MM`, `yyyy`', function() {
      expectParse('17.11.2013', 'dd.MM.yyyy', new Date(2013, 10, 17, 0));
      expectParse('31.12.2013', 'dd.MM.yyyy', new Date(2013, 11, 31, 0));
      expectParse('08-03-1991', 'dd-MM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('03/05/1980', 'MM/dd/yyyy', new Date(1980, 2, 5, 0));
      expectParse('10.01/1983', 'dd.MM/yyyy', new Date(1983, 0, 10, 0));
      expectParse('11-09-1980', 'MM-dd-yyyy', new Date(1980, 10, 9, 0));
      expectParse('2011/02/05', 'yyyy/MM/dd', new Date(2011, 1, 5, 0));
      expectParse('0001/03/06', 'yyyy/MM/dd', oldDate);
    });

    it('should work correctly for `yy`', function() {
      expectParse('17.11.13', 'dd.MM.yy', new Date(2013, 10, 17, 0));
      expectParse('02-05-11', 'dd-MM-yy', new Date(2011, 4, 2, 0));
      expectParse('02/05/80', 'MM/dd/yy', new Date(1980, 1, 5, 0));
      expectParse('55/02/05', 'yy/MM/dd', new Date(2055, 1, 5, 0));
      expectParse('11-08-13', 'dd-MM-yy', new Date(2013, 7, 11, 0));
    });

    it('should use `68` as the pivot year for `yy`', function() {
      expectParse('17.11.68', 'dd.MM.yy', new Date(2068, 10, 17, 0));
      expectParse('17.11.69', 'dd.MM.yy', new Date(1969, 10, 17, 0));
    });

    it('should work correctly for `y`', function() {
      expectParse('17.11.2013', 'dd.MM.y', new Date(2013, 10, 17, 0));
      expectParse('31.12.2013', 'dd.MM.y', new Date(2013, 11, 31, 0));
      expectParse('08-03-1991', 'dd-MM-y', new Date(1991, 2, 8, 0));
      expectParse('03/05/1980', 'MM/dd/y', new Date(1980, 2, 5, 0));
      expectParse('10.01/1983', 'dd.MM/y', new Date(1983, 0, 10, 0));
      expectParse('11-09-1980', 'MM-dd-y', new Date(1980, 10, 9, 0));
      expectParse('2011/02/05', 'y/MM/dd', new Date(2011, 1, 5, 0));
    });

    it('should work correctly for `MMMM`', function() {
      expectParse('17.November.13', 'dd.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('05-March-1980', 'dd-MMMM-yyyy', new Date(1980, 2, 5, 0));
      expectParse('February/05/1980', 'MMMM/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1949/December/20', 'yyyy/MMMM/dd', new Date(1949, 11, 20, 0));
      expectParse('0001/March/06', 'yyyy/MMMM/dd', oldDate);
    });

    it('should work correctly for `MMM`', function() {
      expectParse('30.Sep.10', 'dd.MMM.yy', new Date(2010, 8, 30, 0));
      expectParse('02-May-11', 'dd-MMM-yy', new Date(2011, 4, 2, 0));
      expectParse('Feb/05/1980', 'MMM/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/Feb/05', 'yyyy/MMM/dd', new Date(1955, 1, 5, 0));
      expectParse('0001/Mar/06', 'yyyy/MMM/dd', oldDate);
    });

    it('should work correctly for `M`', function() {
      expectParse('8/11/2013', 'M/dd/yyyy', new Date(2013, 7, 11, 0));
      expectParse('07.11.05', 'dd.M.yy', new Date(2005, 10, 7, 0));
      expectParse('02-5-11', 'dd-M-yy', new Date(2011, 4, 2, 0));
      expectParse('2/05/1980', 'M/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/2/05', 'yyyy/M/dd', new Date(1955, 1, 5, 0));
      expectParse('02-5-11', 'dd-M-yy', new Date(2011, 4, 2, 0));
    });

    it('should work correctly for `M!`', function() {
      expectParse('8/11/2013', 'M!/dd/yyyy', new Date(2013, 7, 11, 0));
      expectParse('07.11.05', 'dd.M!.yy', new Date(2005, 10, 7, 0));
      expectParse('02-5-11', 'dd-M!-yy', new Date(2011, 4, 2, 0));
      expectParse('2/05/1980', 'M!/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/2/05', 'yyyy/M!/dd', new Date(1955, 1, 5, 0));
      expectParse('02-5-11', 'dd-M!-yy', new Date(2011, 4, 2, 0));
      expectParse('0001/3/06', 'yyyy/M!/dd', oldDate);

      expectParse('08/11/2013', 'M!/dd/yyyy', new Date(2013, 7, 11, 0));
      expectParse('07.11.05', 'dd.M!.yy', new Date(2005, 10, 7, 0));
      expectParse('02-05-11', 'dd-M!-yy', new Date(2011, 4, 2, 0));
      expectParse('02/05/1980', 'M!/dd/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/02/05', 'yyyy/M!/dd', new Date(1955, 1, 5, 0));
      expectParse('02-05-11', 'dd-M!-yy', new Date(2011, 4, 2, 0));
      expectParse('0001/03/06', 'yyyy/M!/dd', oldDate);
    });

    it('should work correctly for `d`', function() {
      expectParse('17.November.13', 'd.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991', 'd-MMMM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980', 'MMMM/d/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5', 'yyyy/MMMM/d', new Date(1955, 1, 5, 0));
      expectParse('11-08-13', 'd-MM-yy', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6', 'yyyy/MM/d', oldDate);
    });

    it('should work correctly for `d!`', function() {
      expectParse('17.November.13', 'd!.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991', 'd!-MMMM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980', 'MMMM/d!/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5', 'yyyy/MMMM/d!', new Date(1955, 1, 5, 0));
      expectParse('11-08-13', 'd!-MM-yy', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6', 'yyyy/MM/d!', oldDate);

      expectParse('17.November.13', 'd!.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('08-March-1991', 'd!-MMMM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('February/05/1980', 'MMMM/d!/yyyy', new Date(1980, 1, 5, 0));
      expectParse('1955/February/05', 'yyyy/MMMM/d!', new Date(1955, 1, 5, 0));
      expectParse('11-08-13', 'd!-MM-yy', new Date(2013, 7, 11, 0));
      expectParse('0001/03/06', 'yyyy/MM/d!', oldDate);
    });

    it('should work correctly for `EEEE`', function() {
      expectParse('Sunday.17.November.13', 'EEEE.d.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('8-Friday-March-1991', 'd-EEEE-MMMM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/Tuesday', 'MMMM/d/yyyy/EEEE', new Date(1980, 1, 5, 0));
      expectParse('1955/Saturday/February/5', 'yyyy/EEEE/MMMM/d', new Date(1955, 1, 5, 0));
    });

    it('should work correctly for `EEE`', function() {
      expectParse('Sun.17.November.13', 'EEE.d.MMMM.yy', new Date(2013, 10, 17, 0));
      expectParse('8-Fri-March-1991', 'd-EEE-MMMM-yyyy', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/Tue', 'MMMM/d/yyyy/EEE', new Date(1980, 1, 5, 0));
      expectParse('1955/Sat/February/5', 'yyyy/EEE/MMMM/d', new Date(1955, 1, 5, 0));
    });

    it('should work correctly for `HH`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.HH', new Date(2015, 2, 22, 22));
      expectParse('8-March-1991-11', 'd-MMMM-yyyy-HH', new Date(1991, 2, 8, 11));
      expectParse('February/5/1980/00', 'MMMM/d/yyyy/HH', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5 03', 'yyyy/MMMM/d HH', new Date(1955, 1, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy HH', new Date(2013, 7, 11, 23));
    });

    it('should work correctly for `H`', function() {
      expectParse('22.March.15.22', 'd.MMMM.yy.H', new Date(2015, 2, 22, 22));
      expectParse('8-March-1991-11', 'd-MMMM-yyyy-H', new Date(1991, 2, 8, 11));
      expectParse('February/5/1980/0', 'MMMM/d/yyyy/H', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5 3', 'yyyy/MMMM/d H', new Date(1955, 1, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy H', new Date(2013, 7, 11, 23));
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

    it('should work correctly for `Z`', function() {
      expectParse('22.March.15 -0700', 'd.MMMM.yy Z', new Date(2015, 2, 21, 17, 0, 0));
      expectParse('8-March-1991 +0800', 'd-MMMM-yyyy Z', new Date(1991, 2, 8, 8, 0, 0));
      expectParse('February/5/1980 -0200', 'MMMM/d/yyyy Z', new Date(1980, 1, 4, 22, 0, 0));
      expectParse('1955/February/5 +0400', 'yyyy/MMMM/d Z', new Date(1955, 1, 5, 4, 0, 0));
      expectParse('11-08-13 -1234', 'd-MM-yy Z', new Date(2013, 7, 10, 11, 26, 0));
      expectParse('22.March.15.22:33:4 -1200', 'd.MMMM.yy.HH:mm:s Z', new Date(2015, 2, 22, 10, 33, 4));
      expectParse('22.March.15.22:3:4 +1500', 'd.MMMM.yy.HH:m:s Z', new Date(2015, 2, 23, 13, 3, 4));
    });

    it('should work correctly for `ww`', function() {
      expectParse('17.November.13.45', 'd.MMMM.yy.ww', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991-09', 'd-MMMM-yyyy-ww', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/05', 'MMMM/d/yyyy/ww', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5/04', 'yyyy/MMMM/d/ww', new Date(1955, 1, 5, 0));
      expectParse('11-08-13 44', 'd-MM-yy ww', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6 10', 'yyyy/MM/d ww', oldDate);
    });

    it('should work correctly for `w`', function() {
      expectParse('17.November.13.45', 'd.MMMM.yy.w', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991-9', 'd-MMMM-yyyy-w', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/5', 'MMMM/d/yyyy/w', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5/4', 'yyyy/MMMM/d/w', new Date(1955, 1, 5, 0));
      expectParse('11-08-13 44', 'd-MM-yy w', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6 10', 'yyyy/MM/d w', oldDate);
    });

    it('should work correctly for `G`', function() {
      expectParse('17.November.13.AD', 'd.MMMM.yy.G', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991-BC', 'd-MMMM-yyyy-G', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/AD', 'MMMM/d/yyyy/G', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5/BC', 'yyyy/MMMM/d/G', new Date(1955, 1, 5, 0));
      expectParse('11-08-13 AD', 'd-MM-yy G', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6 BC', 'yyyy/MM/d G', oldDate);
    });

    it('should work correctly for `GG`', function() {
      expectParse('17.November.13.AD', 'd.MMMM.yy.GG', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991-BC', 'd-MMMM-yyyy-GG', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/AD', 'MMMM/d/yyyy/GG', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5/BC', 'yyyy/MMMM/d/GG', new Date(1955, 1, 5, 0));
      expectParse('11-08-13 AD', 'd-MM-yy GG', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6 BC', 'yyyy/MM/d GG', oldDate);
    });

    it('should work correctly for `GGG`', function() {
      expectParse('17.November.13.AD', 'd.MMMM.yy.GGG', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991-BC', 'd-MMMM-yyyy-GGG', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/AD', 'MMMM/d/yyyy/GGG', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5/BC', 'yyyy/MMMM/d/GGG', new Date(1955, 1, 5, 0));
      expectParse('11-08-13 AD', 'd-MM-yy GGG', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6 BC', 'yyyy/MM/d GGG', oldDate);
    });

    it('should work correctly for `GGGG`', function() {
      expectParse('17.November.13.Anno Domini', 'd.MMMM.yy.GGGG', new Date(2013, 10, 17, 0));
      expectParse('8-March-1991-Before Christ', 'd-MMMM-yyyy-GGGG', new Date(1991, 2, 8, 0));
      expectParse('February/5/1980/Anno Domini', 'MMMM/d/yyyy/GGGG', new Date(1980, 1, 5, 0));
      expectParse('1955/February/5/Before Christ', 'yyyy/MMMM/d/GGGG', new Date(1955, 1, 5, 0));
      expectParse('11-08-13 Anno Domini', 'd-MM-yy GGGG', new Date(2013, 7, 11, 0));
      expectParse('0001/03/6 Before Christ', 'yyyy/MM/d GGGG', oldDate);
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

  describe('with value literals', function() {
    describe('filter', function() {
      it('should work with multiple literals', function() {
        expect(dateParser.filter(new Date(2013, 0, 29), 'd \'de\' MMMM \'de\' y')).toEqual('29 de January de 2013');
      });

      it('should work with escaped single quote', function() {
        expect(dateParser.filter(new Date(2015, 2, 22, 12), 'd.MMMM.yy h \'o\'\'clock\'')).toEqual('22.March.15 12 o\'clock');
      });

      it('should work with only a single quote', function() {
        expect(dateParser.filter(new Date(2015, 2, 22), 'd.MMMM.yy \'\'\'')).toEqual('22.March.15 \'');
      });

      it('should work with trailing literal', function() {
        expect(dateParser.filter(new Date(2013, 0, 1), '\'year\' y')).toEqual('year 2013');
      });

      it('should work without whitespace', function() {
        expect(dateParser.filter(new Date(2013, 0, 1), '\'year:\'y')).toEqual('year:2013');
      });
    });

    describe('parse', function() {
      it('should work with multiple literals', function() {
        expect(dateParser.parse('29 de January de 2013', 'd \'de\' MMMM \'de\' y')).toEqual(new Date(2013, 0, 29));
      });

      it('should work with escaped single quote', function() {
        expect(dateParser.parse('22.March.15 12 o\'clock', 'd.MMMM.yy h \'o\'\'clock\'')).toEqual(new Date(2015, 2, 22, 12));
      });

      it('should work with only a single quote', function() {
        expect(dateParser.parse('22.March.15 \'', 'd.MMMM.yy \'\'\'')).toEqual(new Date(2015, 2, 22));
      });

      it('should work with trailing literal', function() {
        expect(dateParser.parse('year 2013', '\'year\' y')).toEqual(new Date(2013, 0, 1));
      });

      it('should work without whitespace', function() {
        expect(dateParser.parse('year:2013', '\'year:\'y')).toEqual(new Date(2013, 0, 1));
      });
    });
  });

  describe('with edge case', function() {
    it('should not work for invalid number of days in February', function() {
      expectParse('29.02.2013', 'dd.MM.yyyy', undefined);
    });

    it('should not work for 0 number of days', function() {
      expectParse('00.02.2013', 'dd.MM.yyyy', undefined);
    });

    it('should work for 29 days in February for leap years', function() {
      expectParse('29.02.2000', 'dd.MM.yyyy', new Date(2000, 1, 29, 0));
    });

    it('should not work for 31 days for some months', function() {
      expectParse('31-04-2013', 'dd-MM-yyyy', undefined);
      expectParse('November 31, 2013', 'MMMM d, yyyy', undefined);
    });
  });

  describe('base date', function() {
    var baseDate;

    beforeEach(function() {
      baseDate = new Date(2010, 10, 10);
    });

    it('should pre-initialize our date with a base date', function() {
      expect(expectBaseParse('2015', 'yyyy', baseDate, new Date(2015, 10, 10)));
      expect(expectBaseParse('1', 'M', baseDate, new Date(2010, 0, 10)));
      expect(expectBaseParse('1', 'd', baseDate, new Date(2010, 10, 1)));
    });

    it('should ignore the base date when it is an invalid date', inject(function($log) {
      spyOn($log, 'warn');
      expect(expectBaseParse('30-12', 'dd-MM', new Date('foo'), new Date(1900, 11, 30)));
      expect(expectBaseParse('30-2015', 'dd-yyyy', 'I am a cat', new Date(2015, 0, 30)));
      expect($log.warn).toHaveBeenCalledWith('dateparser:', 'baseDate is not a valid date');
    }));
  });

  it('should not parse non-string inputs', function() {
    expectParse(123456, 'dd.MM.yyyy', 123456);
    var date = new Date();
    expectParse(date, 'dd.MM.yyyy', date);
  });

  it('should not parse if no format is specified', function() {
    expectParse('21.08.1951', '', '21.08.1951');
  });

  it('should reinitialize when locale changes', inject(function($locale) {
    spyOn(dateParser, 'init').and.callThrough();
    expect($locale.id).toBe('en-us');

    $locale.id = 'en-uk';

    dateParser.parse('22.March.15.22', 'd.MMMM.yy.s');

    expect(dateParser.init).toHaveBeenCalled();
  }));

  describe('timezone functions', function() {
    describe('toTimezone', function() {
      it('adjusts date: PST - EST', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.toTimezone(date, 'PST');
        var toEastDate = dateParser.toTimezone(date, 'EST');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 3);
      });

      it('adjusts date: GMT-0500 - GMT+0500', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.toTimezone(date, 'GMT-0500');
        var toEastDate = dateParser.toTimezone(date, 'GMT+0500');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 10);
      });

      it('adjusts date: -600 - +600', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.toTimezone(date, '-600');
        var toEastDate = dateParser.toTimezone(date, '+600');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 12);
      });

      it('tolerates null date', function() {
        var date = null;
        var toNullDate = dateParser.toTimezone(date, '-600');
        expect(toNullDate).toEqual(date);
      });

      it('tolerates null timezone', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toNullTimezoneDate = dateParser.toTimezone(date, null);
        expect(toNullTimezoneDate).toEqual(date);
      });
    });

    describe('fromTimezone', function() {
      it('adjusts date: PST - EST', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var fromWestDate = dateParser.fromTimezone(date, 'PST');
        var fromEastDate = dateParser.fromTimezone(date, 'EST');
        expect(fromWestDate.getTime() - fromEastDate.getTime()).toEqual(1000 * 60 * 60 * -3);
      });

      it('adjusts date: GMT-0500 - GMT+0500', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var fromWestDate = dateParser.fromTimezone(date, 'GMT-0500');
        var fromEastDate = dateParser.fromTimezone(date, 'GMT+0500');
        expect(fromWestDate.getTime() - fromEastDate.getTime()).toEqual(1000 * 60 * 60 * -10);
      });

      it('adjusts date: -600 - +600', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var fromWestDate = dateParser.fromTimezone(date, '-600');
        var fromEastDate = dateParser.fromTimezone(date, '+600');
        expect(fromWestDate.getTime() - fromEastDate.getTime()).toEqual(1000 * 60 * 60 * -12);
      });

      it('tolerates null date', function() {
        var date = null;
        var toNullDate = dateParser.fromTimezone(date, '-600');
        expect(toNullDate).toEqual(date);
      });

      it('tolerates null timezone', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toNullTimezoneDate = dateParser.fromTimezone(date, null);
        expect(toNullTimezoneDate).toEqual(date);
      });
    });

    describe('timezoneToOffset', function() {
      it('calculates minutes off from current timezone', function() {
        var offsetMinutesUtc = dateParser.timezoneToOffset('UTC');
        var offsetMinutesUtcPlus1 = dateParser.timezoneToOffset('GMT+0100');
        expect(offsetMinutesUtc - offsetMinutesUtcPlus1).toEqual(60);
      });
    });

    describe('addDateMinutes', function() {
      it('adds minutes to a date', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var oneHourMore = dateParser.addDateMinutes(date, 60);
        expect(oneHourMore).toEqual(new Date('2008-01-01T01:00:00.000Z'));
      });
    });

    describe('convertTimezoneToLocal', function() {
      it('adjusts date: PST - EST', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.convertTimezoneToLocal(date, 'PST');
        var toEastDate = dateParser.convertTimezoneToLocal(date, 'EST');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 3);
      });

      it('adjusts date: GMT-0500 - GMT+0500', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.convertTimezoneToLocal(date, 'GMT-0500');
        var toEastDate = dateParser.convertTimezoneToLocal(date, 'GMT+0500');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 10);
      });

      it('adjusts date: -600 - +600', function() {
        var date = new Date('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.convertTimezoneToLocal(date, '-600');
        var toEastDate = dateParser.convertTimezoneToLocal(date, '+600');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 12);
      });
    });
  });
});
