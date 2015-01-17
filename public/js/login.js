document.addEventListener('DOMContentLoaded', function () {

    var user;
    $.get('/login/validate').done(function (data) {
        user = data.user;
        if (user) {
            $('.loginandregister').hide();
            $('.username').html(user.username);
            $('#logout-section').show();
        }
    });

    document.forms.register.addEventListener('submit', function (event) {
        event.preventDefault();
        // reset the message
        var $message = $(this.getElementsByClassName('message')[0]);
        var form = this;
        $message.html('');
        $.post('/login/register', {
            username: this.username.value,
            email: this.email.value,
            password: this.password.value,
            batchname: this.batchname.value
        }).done(function (data) {
            form.reset();
            $message.css({color: '#aaaaaa'});
            $message.html('Thanks for registering! Please login now.');
            $('[name="login"]').focus();
        }).fail(function (xhr) {
            console.log($message.html());
            var err = JSON.parse(xhr.responseText);
            if (err) {
                if (err.name && err.name === 'ValidationError') {
                    $message.html('Please provide valid data!');
                } else {
                    $message.html(err.message);
                }
            } else {
                $message.html(xhr.responseText);
            }

        });
        return false;
    });
    document.forms.login.addEventListener('submit', function (event) {
        event.preventDefault();
        // reset the message
        var $message = $(this.getElementsByClassName('message')[0]);
        var form = this;
        $message.html('');
        $.post('/login', {
            username: this.username.value,
            password: this.password.value
        }).done(function (data) {
            console.log(data);
            user = data;
            form.reset();
            $('#logout-section').show();
            $('.username').html(user.username);
            $('.loginandregister').remove();
        }).fail(function (xhr) {
            console.log(xhr.responseText);
            if (xhr.status === 401 || xhr.status === 400) {
                $message.html('Hmm... that does not work!');
            }
        });
        return false;
    });
});

