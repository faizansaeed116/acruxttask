export function ShowLoading(BLOCK) {
    let zindex = 2;

    if (BLOCK == 'body') {
        zindex = 1200;
    }

    $(BLOCK).block({
        message: '<div class="pace-demo"><div class="theme_xbox"><div class="pace_activity"></div></div></div>',
        // message: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
        overlayCSS: {
            backgroundColor: 'rgba(0, 0, 0)',
            zIndex: zindex,
            cursor: 'wait',
            'box-shadow': '0 0 0 1px #ddd'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            zIndex: 1201,
            backgroundColor: 'transparent'
        }
    });
}

export function RemoveLoading(BLOCK) {
    $(BLOCK).unblock();
}