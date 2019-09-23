const express = require('express');

const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos);

    //Crear vacantes
    router.get('/vacantes/nueva',
    authController.verificaUsuario,
    vacantesController.formularioNuevaVacante);

    router.post('/vacantes/nueva', 
    authController.verificaUsuario,
    vacantesController.validarVacante,
    vacantesController.agregarVacante);

    //mostrar vacante (singular)
    router.get('/vacantes/:url',vacantesController.mostrarVacante);

    //Editar vacante
    router.get('/vacantes/editar/:url', 
    authController.verificaUsuario,
    vacantesController.formEditarVacante);

    router.post('/vacantes/editar/:url',
    authController.verificaUsuario,
    vacantesController.validarVacante,
    vacantesController.editarVacante);

    //Eliminar vacantes
    router.delete('/vacantes/eliminar/:id',
        vacantesController.eliminarVacante);

    //Crear cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',
     usuariosController.validarRegistro,
     usuariosController.crearUsuario);

     //Autenticar usuarios
     router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
     router.post('/iniciar-sesion',authController.autenticarUsuario)

     //cerrar sesión
     router.get('/cerrar-sesion',
        authController.verificaUsuario,
        authController.cerrarSesion
    );

    //Reseetear password (emails)
    router.get('/reestablecer-password',
    authController.formReestablecerPassword);
    router.post('/reestablecer-password',
    authController.enviarToken);

    //Resetear password (Almacenar en la BD)
    router.get('/reestablecer-password/:token',
    authController.reestablecerPassword);
    router.post('/reestablecer-password/:token',
    authController.guardarPassword);

     //Panel de administración
     router.get('/administracion',
     authController.verificaUsuario,
     authController.mostrarPanel);

     //Editar perfil
     router.get('/editar-perfil',
     authController.verificaUsuario,
     usuariosController.formEditarPerfil);
    
     router.post('/editar-perfil',
     authController.verificaUsuario,
     //usuariosController.validarPerfil,
     usuariosController.subirImgen,// subirImgen es un middleware
     usuariosController.editarperfil)

     //Recibir Mensajes de Candidatos
     router.post('/vacantes/:url',
        vacantesController.subirCV,
        vacantesController.contactar
        );

     //Muestra los candidatos por vacantes
     router.get('/candidatos/:id',
        authController.verificaUsuario,
        vacantesController.mostrarCandidatos)

    //Buscador de vacantes
    router.post('/buscador', vacantesController.buscarVacantes);

    return router;
}