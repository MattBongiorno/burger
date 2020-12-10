$(function() {
    $('.change-devoured').on('click', function(event) {
        const id = $(this).data('id');
        const newDevoured = !$(this).data('devoured');

        let newDevouredState = {
            devoured: newDevoured
        };

        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: newDevouredState
        }).then(function() {

            location.reload();
        });
    });

    $('.create-form').on('submit', function(event) {
        event.preventDefault();
        const burgerInput = $('#burger').val().trim();

        if (burgerInput) {
            const newBurger = {
                burger_name: burgerInput,
                devoured: 0
            };

            $.ajax('/api/burgers', {
                type: 'POST',
                data: newBurger
            }).then(function() {


                location.reload();
            });
        }
    });

    $('.delete-burger').on('click', function(event) {
        var id = $(this).data('id');

        $.ajax('/api/burgers/' + id, {
            type: 'DELETE'
        }).then(function() {

            location.reload();
        });
    });
});