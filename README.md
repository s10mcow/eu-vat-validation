# ES6 EU VAT Number Validation

Fork of [this](https://www.braemoor.co.uk/software/vat.shtml) but updated most of the file to be using ES6 and a more functional approach

##Usage

```
    import VatValidator from 'eu-vat-validation';

    const vatValidator = new VatValidator();

    vatValidator.validate('DE123456789'); //will return boolean
```
