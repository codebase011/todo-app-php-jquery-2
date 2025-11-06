$(function () {
    console.log('Document Ready');

    /*     $.get("api/listar-tareas.php", function(data){
            console.log(data);
        }); */

    const $tablaTareas = $('#tabla-tareas');
    const $mensajeInfo = $('#mensaje-info')
    console.log($tablaTareas);
    $tablaTareas.hide();


    $('#btn-obtener-tareas').on('click', function () {
        obtenerTareas();
    });

    $('#form-insertar').on('submit', function (e) {
        e.preventDefault();

        // Enviar como www-urlencoded (recibir en php como $_POST["title"], etc.)
/*         $.ajax({
            url: 'api/insertar-tarea.php',
            method: 'POST',
            dataType: 'json',
            data: { title: $('#title').val(), description: $('#description').val() },
            success: function (data) {
                console.log('Tarea insertada', data);
                $mensajeInfo.text('Tareas insertada');
                //renderizarTareas(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error al insertar la tarea:', textStatus, errorThrown);
            }
        }); */

        // Enviar como json (recibir en php con $input = json_decode(file_get_contents("php://input"), true);)
        $.ajax({
            url: 'api/insertar-tarea.php',
            method: 'POST',
            contentType: 'application/json',   // <--- le dices a PHP que envías JSON
            dataType: 'json',                  // <--- esperas JSON de respuesta
            data: JSON.stringify({
                title: $('#title').val(),
                description: $('#description').val()
            }),
            success: function (data) {
                console.log('Tarea insertada:', data);
            }
        });
    });

    function obtenerTareas() {
        $mensajeInfo.text('Obteniendo tareas...');
        setTimeout(() => {
            $.ajax({
                url: 'api/listar-tareas.php',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log('Tareas recibidas via AJAX:', data);
                    $mensajeInfo.text('Tareas recibidas');
                    renderizarTareas(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Error al obtener las tareas:', textStatus, errorThrown);
                }
            });
        }, 1500);
    }

    function renderizarTareas(data) {
        const $contenidoTablaTareas = $('#contenido-tabla-tareas');

        $contenidoTablaTareas.empty();

        data.forEach(todo => {
            const $fila = $('<tr></tr>');
            $fila.append(`<td>${todo.id}</td><td>${todo.title}</td><td>${todo.description}</td><td>${todo.created_at}</td>`);
            $contenidoTablaTareas.append($fila);
        });

        $tablaTareas.show();
    }
});
