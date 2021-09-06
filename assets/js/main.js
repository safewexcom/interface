(function (document, $) {
    function copyToClipboard(str, elementWrap) {
        var TempText = document.createElement("input");
        TempText.value = str;
        document.getElementById(elementWrap).appendChild(TempText);
        TempText.select();
        document.execCommand("copy");
        document.getElementById(elementWrap).removeChild(TempText);
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.success('Copied to Clipboad!')
    }
    function formatNumber(num) {
        if (!num)
            return '';

        let arrNum = num.toString().split('.');
        num = arrNum.shift().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        arrNum.unshift(num);
        return arrNum.join('.');
    }

    function exchangeCoin(type, num = null)
    {
        const BNB = {
            'default': 0.01,
            'exchange': 9000
        };
        const WBTC = {
            'default': 0.01,
            'exchange': 9000
        };
        const val = parseInt(type);
        let exchange = {
            a: '',
            b: ''
        };
        if (num !== null)
            num = num.replaceAll(/,/ig, '');
        switch (val) {
            case 1:
                exchange.b = formatNumber(WBTC.default * WBTC.exchange);
                exchange.a = formatNumber(WBTC.default);
                
                if (num !== null) {
                    exchange.b = formatNumber(num * WBTC.exchange);
                    exchange.a = formatNumber(num);
                }
                break;
            case 2:
                exchange.b = formatNumber(BNB.default * BNB.exchange);
                exchange.a = formatNumber(BNB.default);
                if (num !== null) {
                    exchange.b = formatNumber(num * BNB.exchange);
                    exchange.a = formatNumber(num);
                }
                break;
        }
        return exchange;
    }

    $('.select-box__current').click(function () {
        $(this).closest('.airdrop__exchange--form--group').find('.select-box__icon:first').toggleClass('select-box__icon--rotate');
        $(this).closest('.airdrop__exchange--form--group').find('.select-box__list:first').toggleClass('show-select-box-list')
    });

    $(document).mouseup(function(e) 
    {
        var container = $(".select-box__list");

        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            container.removeClass('show-select-box-list');
            $('.select-box__icon').removeClass('select-box__icon--rotate');
        }
    });
    $(function () {
        const type = $('input[name=coin_a]:checked').val();
        let buyinput = $('#buyinput').val();

        $('input[name=coin_a]').change(function () {
            const type = $(this).val();
            const exchange = exchangeCoin(type);
            $('#buyinput').val(exchange.a);
            $('#coinB').val(exchange.b);

            if (type == 1) {
                $('#btnBNB').addClass('d-none');
                $('#btnwBTC').removeClass('d-none');
            }
            else {
                $('#btnBNB').removeClass('d-none');
                $('#btnwBTC').addClass('d-none');
            }
        });
        $('#buyinput').keyup(function () {
            const num = $(this).val();
            let caret_pos = $(this).prop("selectionStart");
        
            const type = $('input[name=coin_a]:checked').val();
            const exchange = exchangeCoin(type, num);
            $('#buyinput').val(exchange.a);
            $('#coinB').val(exchange.b);

            caret_pos = exchange.a.length - num.length + caret_pos;
            $(this)[0].setSelectionRange(caret_pos, caret_pos);
            
        });
        
        if (buyinput !== '') {
            const exchange = exchangeCoin(type, buyinput);
            $('#buyinput').val(exchange.a);
            $('#coinB').val(exchange.b);
        }
    });

})(document, $);
