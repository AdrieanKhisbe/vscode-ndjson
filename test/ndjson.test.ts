import {describe, it} from 'mocha';
import {expect} from 'chai';
import {checkDiagnostics} from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
describe('So far dummy tests', function () {
  it('that just check function exposed', () => {
    expect(checkDiagnostics).to.be.a('function');
  });
});
