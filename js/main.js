import { getData } from './utils';

document.forms['recipe-fetch-form'].addEventListener('submit', event => {
    event.preventDefault();
    getData('http://www.recipepuppy.com/api/', '#recipe-fetch-list');
});