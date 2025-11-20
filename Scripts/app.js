
devcore.global = function () {

    OK = 1;
    ALERTA = 2;
    ERROR = 3;

    var detalleErrorMensaje = false;

    dom = '<"top leni" l>rt<"pull-left m-r-10 m-t-5"><"pull-left"i><"clear"><"pull-right"p>';

    idiomaDT = {
        "sInfo": "Mostrando <b>_START_</b> a <b>_END_</b> de _TOTAL_ registros",
        "oPaginate": {
            "sFirst": "Primero",
            "sPrevious": "Antes",
            "sNext": "Siguiente",
            "sLast": "Ultimo"
        },
        select: {
            rows: "%d registros seleccionados"
        },
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sProcessing": '', /*'Cargando...'*/
        "sZeroRecords": "No hay datos disponibles en la tabla",
        "sInfoFiltered": "(filtrado de _MAX_ registros)"
    };

    botonActualizar = function (id) {
        $("#" + id + ",." + id).attr('disabled', 'disabled');
        $("#" + id + ",." + id).find('i').addClass('fa-spin');
    };

    botonActualizar2 = function (id) {
        $("#" + id + ",." + id).removeAttr('disabled', 'disabled');
        $("#" + id + ",." + id).find('i').removeClass('fa-spin');
    };


    bloquearDiv = function (div) {

        //var $div = $("#" + div);
        var ancho = div.width();
        var texto = "CARGANDO";
        var anchoMensaje = 160;

        div.block({
            centerX: false,
            centerY: false,
            //message: '<table style="width:120px;margin:0 auto"><tr><td><span style="font-size:27px" class="fa fa-spinner fa-spin"></span></td><td><p style="margin-bottom:0;font-size:14px">CARGANDO...</p></td></tr></table>',
            message: '<table style="width:100%;margin:0 auto"><tr><td width="33px"><div class="spinner-border text-danger" role="status"><span class="sr-only" >Cargando...</span></div ></td><td><p style="margin-bottom:0;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"">' + texto + '...</p></td></tr></table>',
            css: {
                //border: '1px solid #9da0aa',
                border: '1px solid white',
                padding: '10px',
                //backgroundColor: 'grey',
                //'-webkit-border-radius': '10px',
                //'-moz-border-radius': '10px',
                //opacity: .65,
                'z-index': '99999',
                'width': anchoMensaje,
                //'width': 'inherit',
                //'min-width': '160',
                left: (ancho / 2) - (anchoMensaje / 2),
                //left: 'calc(50% - 80px)',
                color: 'black',
                //color: '#244289',
                "border-radius": "6px",
                //"box-shadow": "2px 2px 5px rgba(4, 4, 5, 0.5)"
            },
            overlayCSS: {
                backgroundColor: 'grey',
                //backgroundColor: 'rgba(48, 86, 177, 0.24)',
                opacity: 0.5,
                cursor: 'wait',
                //'height': '100vh',
                'z-index': '99998'
            }
        });
    };

    desbloquearDiv = function (div) {
        div.unblock();
    };

    /**
     * Mensajes | 0:Información | 1:confirmación | 2:Alerta | 3:Error
     * @param {any} tipo tipo 1:confirmación
     * @param {any} mensaje mensaje
     */
    mensajeDevCore = function (tipo, mensaje) {

        var $div = "";
        var $icono = "";
        var $clase = "";

        if (tipo === null || typeof tipo === 'undefined')
            tipo = 0;

        if (mensaje === null || typeof mensaje === 'undefined')
            mensaje = "Mensaje informativo";

        if (tipo === 1) {
            titulo = "Confirmación";
            $icono = "fas fa-check-circle";
            $clase = "confirmacion";
        } else if (tipo === 2) {
            titulo = "Alerta";
            $icono = "fas fa-exclamation-triangle";
            $clase = "alerta";
        } else if (tipo === 3) {
            titulo = "Error";
            $icono = "fas fa-bug";
            $clase = "error";
        } else {
            titulo = "Información";
            $icono = "text-primary fas fa-info-circle";
        }

        $div += '<div role="alert" aria-live="assertive" aria-atomic="true" class="toast ' + $clase + '" data-autohide="true" data-delay="4000" style="z-index:1031">';
        $div += '<div class="toast-header">';
        $div += '<span class="mr-2 f-s-16 ' + $icono + '"></span>';
        $div += '<strong class="mr-auto">' + titulo + '</strong>';
        $div += '<small></small>';
        $div += '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
        $div += '<span aria-hidden="true">&times;</span>';
        $div += '</button>';
        $div += '</div>';
        $div += '<div class="toast-body">';
        $div += mensaje;
        $div += '</div>';
        $div += '</div>';

        $('body').append($div);

        //$('.toast').toast('show');

        $('.toast').toast('show', {
            delay: 80000
        });

        $('.toast').on('hidden.bs.toast', function () {
            $('.toast').remove();
        });
    };

    var bindAjaxForm = function (dialog) {
        var modalId = $(dialog).attr("id");
        var btn, texto;
        $("form").removeData("validator");
        $("form").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse('form');

        var $validator = $(dialog).find("form").validate();

        if (typeof ($validator) !== "undefined") {

            //https://code.i-harness.com/en/q/16b8aef
            //$validator.settings.highlight = function (element, errorClass, validClass) {
            //    var $element = $(element);

            //    if ($element.hasClass("select2-hidden-accessible")) {
            //        $element.next().addClass(errorClass).removeClass(validClass);
            //        $element.next().show();
            //    }
            //    else if ($element.hasClass("plantillaFecha")) {
            //        $element.parent().addClass(errorClass);
            //        $element.addClass(errorClass).removeClass(validClass);
            //    }
            //    else if (element.type === "radio") {
            //        this.findByName(element.name).addClass(errorClass).removeClass(validClass);
            //    } else {
            //        $element.addClass(errorClass).removeClass(validClass);
            //    }
            //};

            //$validator.settings.unhighlight = function (element, errorClass, validClass) {
            //    var $element = $(element);

            //    if ($element.hasClass("select2-hidden-accessible")) {
            //        $element.next().removeClass(errorClass).addClass(validClass);
            //        $element.next().show();
            //    } else if ($element.hasClass("plantillaFecha")) {
            //        $element.parent().removeClass(errorClass);
            //        $element.removeClass(errorClass).addClass(validClass);
            //    } else if (element.type === "radio") {
            //        this.findByName(element.name).removeClass(errorClass).addClass(validClass);
            //    } else {
            //        $element.removeClass(errorClass).addClass(validClass);
            //    }
            //};
        }

        $('form', dialog).ajaxForm({
            beforeSubmit: function (data) {
                btn = $(dialog).find(":submit");
                btn.prop('disabled', true);
                texto = btn.text();
                btn.empty();
                btn.append('<i class="fa fa-spinner fa-spin"></i> ' + texto);
            },
            success: function (data) {
                if (data.resultado === OK) {
                    if (typeof data.crear !== "undefined" && data.crear === OK) {
                        var oTable = $('#' + data.tabla).DataTable();
                        oTable.draw(false);
                    } else if (typeof data.actualizar !== "undefined" && data.actualizar === OK) {
                        oTable = $('#' + data.tabla).DataTable();
                        oTable.draw(false);
                    }

                    if (data.mensaje !== null) {
                        mensajeDevCore(1, data.mensaje);
                    }

                    $("#" + modalId).modal('hide');

                } else if (data.resultado === ALERTA) {
                    mensajeDevCore(2, data.mensaje);
                } else if (data.resultado === ERROR) {
                    if (detalleErrorMensaje === true) {
                        data.mensaje = data.mensaje + "<br />" + (data.detalleError !== null ? data.detalleError : "");
                    }
                    mensajeDevCore(3, data.mensaje);
                } else {
                    if (typeof data.validaciones !== "undefined" && data.validaciones !== null) {
                        var errors = {};
                        $.each(data.validaciones, function (index, valor) {
                            errors[valor.Key] = valor.Value;
                        });
                        $validator.showErrors(errors);
                    }
                }
                //console.log("boton")
                btn.prop('disabled', false);
                btn.empty();
                btn.text(texto);
            },
            error: function (data) {
                if (data.status === "500") {
                    btn.prop('disabled', false);
                    btn.empty();
                    btn.text(texto);
                    mensajeDevCore(3, "Ha ocurrido un error, por favor intente de nuevo más tarde");
                }
            },
            complete: function (res, xhr) {
                //console.log(res.responseJSON);
                var url = "";

                if (res.responseJSON.imprimir) {
                    url = URL_BASE + "OrdenTrabajo/VistaPrevia?id=" + res.responseJSON.id + "&pdf=" + res.responseJSON.pdf;
                    crearModalXL(url, 1, 1);
                }

                if (res.responseJSON.informe) {
                    url = URL_BASE + "OrdenTrabajo/CrearInformeTecnico/?ordenTrabajoId=" + res.responseJSON.id;
                    crearModalLG(url, 1, 1);
                }
            }
        });
    };

    llamadaEntrante = function (contacto) {

        var id = "modalLlamadaEntrante";
        var $modal = "";

        $modal = '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog">';
        $modal += '<div class="modal-dialog modal-dialog-centered" role="document">';
        $modal += '<div class="modal-content">';
        $modal += '<div class="modal-body"><div class="form-row"><div class="col-md-12"><img style="padding:3px;border:1px solid #dfe5e8;margin:0 10px 0 0;border-radius:4px" src="' + crearAvatar(contacto) + '" />';
        $modal += '<span class="fas fa-phone" style="transform:rotate(90deg)"></span><span class="font-weight-bold"> Llamada entrante </span>';
        $modal += '<span>' + contacto.Numero + '</span>';
        $modal += '</br><span style="padding:0 52px"> ' + contacto.Cuenta + '</span>';
        $modal += '</div></div></div>';
        $modal += '<div class="modal-footer"><button type="button" id="btnContestarLlamada" class="btn btn-success btn-sm">Responder</button><button id="btnColgar" type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Ignorar</button></div>';
        $modal += '</div>';
        $modal += '</div>';

        $('body').append($modal);

        var $contenedor = $('body').find('#' + id);

        $contenedor.modal({
            show: true,
            keyboard: true,
            backdrop: 'static'
        });

        $contenedor.on('hidden.bs.modal', function () {
            $contenedor.remove();
        });
    };

    crearModalAlerta = function (url, bind, escape, claseDialog) {

        bloquearDiv($('html'));

        var id = uid();
        var $modal = "";

        $modal = '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog">';
        $modal += '<div class="modal-dialog modal-danger modal-dialog-centered modal-" role="document">';
        $modal += '<div class="modal-content bg-gradient-danger">';
        $modal += '</div>';
        $modal += '</div>';

        $('body').append($modal);

        var $contenedor = $('body').find('#' + id);

        if (typeof claseDialog !== "undefined") {
            if (claseDialog.length > 0 && claseDialog.trim !== "")
                $contenedor.find('.modal-dialog').addClass(claseDialog);
        }

        $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function () {
            },
            success: function (html) {
                $contenedor.find('.modal-content').html(html);

                if (bind === 1) {
                    bindAjaxForm($contenedor);
                }

                //$contenedor.modal("show");
                $contenedor.modal({
                    show: true,
                    keyboard: true,
                    backdrop: 'static'
                });
            },
            complete: function () {
                desbloquearDiv($("html"));
            },
            error: function (xhr, props) {
                if (xhr.status !== 401 || xhr.status !== 302) {
                    $contenedor.modal('hide');
                    mensajeDevCore(3, "Ocurrio un error inesperado por favor intenta de nuevo. <br />" + xhr.statusText);
                }
            }
        });

        $contenedor.on('hidden.bs.modal', function () {
            $contenedor.remove();
        });

        //https://stackoverflow.com/a/34203478
        //https://stackoverflow.com/a/48432397
        //$contenedor.on('shown.bs.modal', function () {

        //    //if ($('.select2').length > 0) {
        //    //    var s = $('select:visible:enabled:first', this);
        //    //    var id = s.attr("id");
        //    //    $("#" + id).select2('open');
        //    //} else {
        //    if ($('input:text:visible:enabled:first', this).length > 0) {
        //        console.log($('input:text:visible:enabled:first', this));
        //        $('input:text:visible:enabled:first', this).focus();
        //    } else {
        //        //https://stackoverflow.com/a/4026129
        //        $('textarea:visible:enabled:first', this).focus();
        //    }
        //    //$('input:text:visible:enabled:first,textarea:visible:enabled:first', this).focus();
        //    //}
        //});
    };

    crearModal = function (url, bind, escape, claseDialog) {

        bloquearDiv($('html'));

        var id = uid();

        var $modal = "";

        $modal = '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog">';
        $modal += '<div class="modal-dialog" role="document">';
        $modal += '<div class="modal-content">';
        $modal += '</div>';
        $modal += '</div>';

        $('body').append($modal);

        var $contenedor = $('body').find('#' + id);

        if (typeof claseDialog !== "undefined") {
            if (claseDialog.length > 0 && claseDialog.trim !== "")
                $contenedor.find('.modal-dialog').addClass(claseDialog);
        }

        $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function () {
            },
            success: function (html) {
                if (html.validar) {
                    mensajeDevCore(2, html.mensaje);
                    $contenedor.remove();
                } else {
                    $contenedor.find('.modal-content').html(html);

                    if (bind === 1) {
                        bindAjaxForm($contenedor);
                    }

                    //$contenedor.modal("show");
                    $contenedor.modal({
                        show: true,
                        keyboard: true,
                        backdrop: 'static'
                    });
                }
            },
            complete: function () {
                desbloquearDiv($("html"));
            },
            error: function (xhr, props) {
                if (xhr.status !== 401 || xhr.status !== 302) {
                    $contenedor.modal('hide');
                    mensajeDevCore(3, "Ocurrio un error inesperado por favor intenta de nuevo. <br />" + xhr.statusText);
                }
            }
        });

        $contenedor.on('hidden.bs.modal', function () {
            $contenedor.remove();
        });

        //https://stackoverflow.com/a/34203478
        //https://stackoverflow.com/a/48432397
        $contenedor.on('shown.bs.modal', function () {

            //if ($('.select2').length > 0) {
            //    var s = $('select:visible:enabled:first', this);
            //    var id = s.attr("id");
            //    $("#" + id).select2('open');
            //} else {
            if ($('input:text:visible:enabled:first', this).length > 0) {
                //console.log($('input:text:visible:enabled:first', this))
                $('input:text:visible:enabled:first', this).focus();
            } else {
                //https://stackoverflow.com/a/4026129
                $('textarea:visible:enabled:first', this).focus();
            }
            //$('input:text:visible:enabled:first,textarea:visible:enabled:first', this).focus();
            //}
        });
    };

    crearModalIzquierdolXL = function (url, bind, escape, claseDialog) {
        this.crearModalIzquierdo(url, bind, escape, 1, 'xl');
    };

    crearModalIzquierdolLG = function (url, bind, escape, claseDialog) {
        this.crearModalIzquierdo(url, bind, escape, 1, 'lg');
    };
  
    crearModalIzquierdo = function (url, bind, escape, backdrop, claseDialog) {

        bloquearDiv($('html'));

        var id = uid();

        var $modal = "";

        $modal = '<div class="modal right fade" id="' + id + '" tabindex="-1" role="dialog">';
        $modal += '<div class="modal-dialog" role="document">';
        $modal += '<div class="modal-content">';
        $modal += '</div>';
        $modal += '</div>';

        $('body').append($modal);

        var $contenedor = $('body').find('#' + id);

        if (typeof claseDialog !== "undefined") {
            if (claseDialog.length > 0 && claseDialog.trim !== "")
                $contenedor.find('.modal-dialog').addClass(claseDialog);
        }

        $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function () {
            },
            success: function (html) {
                if (html.validar) {
                    mensajeDevCore(2, html.mensaje);
                    $contenedor.remove();
                } else {
                    $contenedor.find('.modal-content').html(html);

                    if (bind === 1) {
                        bindAjaxForm($contenedor);
                    }

                    var b = 'static';

                    if (backdrop === 2)
                        b = true;

                    //var backdrop = true;

                    //if ($('body').find('.modal-backdrop').length > 0) {
                    //    $('body').find('.modal-backdrop').not(':first').remove();
                    //}

                    //$contenedor.modal("show");
                    $contenedor.modal({
                        show: true,
                        keyboard: true,
                        backdrop: b
                    });
                }
            },
            complete: function () {
                desbloquearDiv($("html"));
            },
            error: function (xhr, props) {
                if (xhr.status !== 401 || xhr.status !== 302) {
                    $contenedor.modal('hide');
                    mensajeDevCore(3, "Ocurrio un error inesperado por favor intenta de nuevo. <br />" + xhr.statusText);
                }
            }
        });

        $contenedor.on('hidden.bs.modal', function () {
            $contenedor.remove();
        });

        //https://stackoverflow.com/a/34203478
        //https://stackoverflow.com/a/48432397
        $contenedor.on('shown.bs.modal', function () {

            //if ($('body').find('.modal-backdrop').length > 0) {
            //    $('body').find('.modal-backdrop').remove();
            //}
            //if ($('.select2').length > 0) {
            //    var s = $('select:visible:enabled:first', this);
            //    var id = s.attr("id");
            //    $("#" + id).select2('open');
            //} else {
            if ($('input:text:visible:enabled:first', this).length > 0) {
                //console.log($('input:text:visible:enabled:first', this))
                $('input:text:visible:enabled:first', this).focus();
            } else {
                //https://stackoverflow.com/a/4026129
                $('textarea:visible:enabled:first', this).focus();
            }
            //$('input:text:visible:enabled:first,textarea:visible:enabled:first', this).focus();
            //}
        });
    };

    crearModalLG = function (url, bind, escape) {
        this.crearModal(url, bind, escape, 'modal-lg');
    };

    crearModalXL = function (url, bind, escape) {
        this.crearModal(url, bind, escape, 'modal-xl');
    };

    crearModalCentrado = function (url, bind, escape) {
        this.crearModal(url, bind, escape, 'modal-dialog-centered');
    };

    crearModalCentradoLG = function (url, bind, escape) {
        this.crearModal(url, bind, escape, 'modal-dialog-centered modal-lg');
    };

    cantidadFilas = function () {
        var altoContenedor = $(".contenedor").height() - 170;

        var cantidadFilas = parseInt(altoContenedor / 33);

        return cantidadFilas;
    };

    uid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    colorAleatorio = function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    crearAvatar = function (contacto) {
        console.log(contacto);
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        canvas.width = '32';
        canvas.height = '32';
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        context.fillStyle = colorAleatorio();
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "16px Arial";
        context.fillStyle = "white";
        var first, last;
        if (contacto && contacto.Cuenta && name.Cuenta != '') {
            first = contacto.Cuenta[0];
            last = contacto.Cuenta[1];
            //last = contacto.last && name.last != '' ? name.last[0] : null;
            if (last) {
                var initials = first + last;
                context.fillText(initials.toUpperCase(), 3, 23);
            } else {
                var initials = first;
                context.fillText(initials.toUpperCase(), 10, 23);
            }
            var data = canvas.toDataURL();
            document.body.removeChild(canvas);
            return data;
        } else {
            return false;
        }
    };

    detalleCliente = function (btn) {
        var id = $(btn).data("clienteid");
        var url = URL_BASE + "Cliente/Detalle/" + id;
        crearModalIzquierdolXL(url, 1, 1);
    };

    editarCliente = function (btn) {
        var id = $(btn).data("clienteid");
        var url = URL_BASE + "Cliente/Editar/" + id;
        crearModalLG(url, 1, 1);
    };

    eliminarCliente = function (btn) {
        var id = $(btn).data("clienteid");
        var url = URL_BASE + "Cliente/Eliminar/" + id;
        crearModalCentrado(url, 1, 1);
    };

    enviarCorreo = function (btn) {
        var email = $(btn).data("email");
        var url = URL_BASE + "Email/Crear?Email=" + email;
        crearModalCentrado(url, 1, 1);
    };

    crearFactura = function () {
        var url = URL_BASE + "Factura/Crear";
        crearModalIzquierdolXL(url, 1, 1);
    };

    crearPagoRecibido = function () {
        var url = URL_BASE + "PagoRecibido/Crear";
        crearModalIzquierdolXL(url, 1, 1);
    };

    crearOrden = function () {
        var url = URL_BASE + "OrdenTrabajo/Crear";
        crearModalIzquierdolXL(url, 1, 1);
    };

    editarFactura = function (btn) {
        var id = $(btn).data("facturaid");
        var url = URL_BASE + "Factura/Editar/" + id;
        crearModalIzquierdolXL(url, 1, 1);
    };

    editarOrden = function (btn) {
        var id = $(btn).data("ordentrabajoid");
        var url = URL_BASE + "OrdenTrabajo/Editar/" + id;
        crearModalIzquierdolXL(url, 1, 1);
    };

    confirmarFactura = function (btn) {
        var id = $(btn).data("ordentrabajoid");
        var url = URL_BASE + "OrdenTrabajo/Confirmacion/" + id;
        crearModalCentrado(url, 1, 1);
    };

    convertirAFactura = function (btn) {
        var id = $(btn).data("ordentrabajoid");
        var url = URL_BASE + "Factura/Crear/" + id;
        crearModalIzquierdolXL(url, 1, 1);
    };

    vistaPrevia = function (btn, pdf) {
        var id = $(btn).data("ordentrabajoid");
        var url = URL_BASE + "OrdenTrabajo/VistaPrevia?id=" + id + "&pdf=" + pdf;
        crearModalXL(url, 1, 1);
    };

    $(document).on("click", ".info-facturas", function () {
        var id = $(this).data('clienteid');
        var url = URL_BASE + "Factura/DetalleFactura?clienteId=" + id;
        crearModalIzquierdo(url, 1, 1, 2);
    });

    editarPagoRecibido = function (btn) {
        var id = $(btn).data("pagoid");
        var url = URL_BASE + "PagoRecibido/Editar/" + id;
        crearModalIzquierdolXL(url, 1, 1);
    };

    $(document).on("click", ".info-detalle", function () {
        var id = $(this).data('clienteid');
        var url = URL_BASE + "Factura/DetalleCliente?clienteId=" + id;
        crearModalIzquierdo(url, 1, 1, 2);
    });

    //$(document).on('click', ".lista .table tr", function () {
    //    $(this).closest('.table').find('tr').removeClass('seleccionado');
    //    $(this).addClass('seleccionado');
    //});

    $(document).on('click', ".numeracionFactura", function () {
        var facturaId = $(this).data('facturaid');
        var url = URL_BASE + "Configuracion/NumeracionFactura/" + facturaId;
        crearModalCentradoLG(url, 1, 1, 2);
    });

    $(document).on('click', ".numeracionOrden", function () {
        var ordenTrabajoId = $(this).data('ordentrabajoid');
        var url = URL_BASE + "Configuracion/NumeracionOrden/" + ordenTrabajoId;
        crearModalCentradoLG(url, 1, 1, 2);
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });

    $(document).on('show.bs.modal', '.modal', function () {
        var $modal = $(this);
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        $(this).find('[autofocus]').focus();
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    $(document).on('show.bs.toast', '.toast', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
    });
};

//https://stackoverflow.com/a/19574076
$.fn.modal.Constructor.prototype._enforceFocus = function () { };

$.validator.addMethod('date', function (value, element) {
    if (this.optional(element)) {
        return true;
    }
    var valid = true;
    return valid;
});


$(document).ready(devcore.global);