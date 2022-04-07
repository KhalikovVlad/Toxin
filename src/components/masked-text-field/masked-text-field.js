import IMask, { Masked } from 'imask';

var lazyMask = IMask(
    document.getElementById('mask'),
    {
        mask: Date,
        lazy: false,
        autofix: true,
        blocks: {
            d: {mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2},
            m: {mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2},
            Y: {mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2023, maxLength: 4}
        }
    }
);