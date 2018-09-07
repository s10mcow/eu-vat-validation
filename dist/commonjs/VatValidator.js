"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CountryVATCheckers = require("./CountryVATCheckers");

var _CountryVATCheckers2 = _interopRequireDefault(_CountryVATCheckers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VatValidator = function () {
  function VatValidator() {
    var defaultVatCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "DE";

    _classCallCheck(this, VatValidator);

    this.defaultVatCode = defaultVatCode;
  }

  VatValidator.prototype.validate = function validate(toCheck) {
    // To change the default country (e.g. from the UK to Germany - DE):
    //    1.  Change the country code in the defCCode variable below to "DE".
    //    2.  Remove the question mark from the regular expressions associated with the UK VAT number:
    //        i.e. "(GB)?" -> "(GB)"
    //    3.  Add a question mark into the regular expression associated with Germany's number
    //        following the country code: i.e. "(DE)" -> "(DE)?"

    var defCCode = this.defaultVatCode;

    // Note - VAT codes without the "**" in the comment do not have check digit checking.
    var vatexp = [/^(AT)U(\d{8})$/, //** Austria
    /^(BE)(0?\d{9})$/, //** Belgium
    /^(BG)(\d{9,10})$/, //** Bulgaria
    /^(CHE)(\d{9})(MWST|TVA|IVA)?$/, //** Switzerland
    /^(CY)([0-59]\d{7}[A-Z])$/, //** Cyprus
    /^(CZ)(\d{8,10})(\d{3})?$/, //** Czech Republic
    /^(DE)([1-9]\d{8})$/, //** Germany
    /^(DK)(\d{8})$/, //** Denmark
    /^(EE)(10\d{7})$/, //** Estonia
    /^(EL)(\d{9})$/, //** Greece
    /^(ES)([A-Z]\d{8})$/, //** Spain (National juridical entities)
    /^(ES)([A-HN-SW]\d{7}[A-J])$/, //** Spain (Other juridical entities)
    /^(ES)([0-9YZ]\d{7}[A-Z])$/, //** Spain (Personal entities type 1)
    /^(ES)([KLMX]\d{7}[A-Z])$/, //** Spain (Personal entities type 2)
    /^(EU)(\d{9})$/, //** EU-type
    /^(FI)(\d{8})$/, //** Finland
    /^(FR)(\d{11})$/, //** France (1)
    /^(FR)([A-HJ-NP-Z]\d{10})$/, // France (2)
    /^(FR)(\d[A-HJ-NP-Z]\d{9})$/, // France (3)
    /^(FR)([A-HJ-NP-Z]{2}\d{9})$/, // France (4)
    /^(GB)?(\d{9})$/, //** UK (Standard)
    /^(GB)?(\d{12})$/, //** UK (Branches)
    /^(GB)?(GD\d{3})$/, //** UK (Government)
    /^(GB)?(HA\d{3})$/, //** UK (Health authority)
    /^(HR)(\d{11})$/, //** Croatia
    /^(HU)(\d{8})$/, //** Hungary
    /^(IE)(\d{7}[A-W])$/, //** Ireland (1)
    /^(IE)([7-9][A-Z\*\+)]\d{5}[A-W])$/, //** Ireland (2)
    /^(IE)(\d{7}[A-W][AH])$/, //** Ireland (3)
    /^(IT)(\d{11})$/, //** Italy
    /^(LV)(\d{11})$/, //** Latvia
    /^(LT)(\d{9}|\d{12})$/, //** Lithunia
    /^(LU)(\d{8})$/, //** Luxembourg
    /^(MT)([1-9]\d{7})$/, //** Malta
    /^(NL)(\d{9})B\d{2}$/, //** Netherlands
    /^(NO)(\d{9})$/, //** Norway (not EU)
    /^(PL)(\d{10})$/, //** Poland
    /^(PT)(\d{9})$/, //** Portugal
    /^(RO)([1-9]\d{1,9})$/, //** Romania
    /^(RU)(\d{10}|\d{12})$/, //** Russia
    /^(RS)(\d{9})$/, //** Serbia
    /^(SI)([1-9]\d{7})$/, //** Slovenia
    /^(SK)([1-9]\d[2346-9]\d{7})$/, //** Slovakia Republic
    /^(SE)(\d{10}01)$/ //** Sweden
    ];
    // Load up the string to check
    var VATNumber = toCheck.toUpperCase();

    // Remove spaces etc. from the VAT number to help validation
    VATNumber = VATNumber.replace(/(\s|-|\.)+/g, "");

    var countryVatCheckers = new _CountryVATCheckers2.default();

    return vatexp.filter(function (regexp) {
      return regexp.test(VATNumber);
    }).map(function (regexp) {
      regexp.test(VATNumber);
      var cCode = RegExp.$1; // Isolate country code
      var cNumber = RegExp.$2; // Isolate the number
      if (cCode.length === 0) {
        cCode = defCCode;
      } // Set up default country code
      // Call the appropriate country VAT validation routine depending on the country code
      return countryVatCheckers[cCode + "VATCheckDigit"](cNumber);
    }).reduce(function (memo, isValid) {
      return isValid;
    }, false);
  };

  return VatValidator;
}();

exports.default = VatValidator;