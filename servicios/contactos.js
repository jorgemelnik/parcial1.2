// Crear un array de contactos que se exporta para usarlo de base de datos
let id = 5;
const contactos = [
    {
        id: 1,
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
        nombre: 'Juan Perez',
        sobrenombre: 'Ejemplero',
        edad: 18,
        email: 'juan@ejemplo.com',
        telefono: '1234567890'
    },
    {
        id: 2,
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
        nombre: 'Juan Perez',
        sobrenombre: 'Ejemplero',
        edad: 18,
        email: 'juan@ejemplo.com',
        telefono: '1234567890'
    },
    {
        id: 3,
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
        nombre: 'Juan Perez',
        sobrenombre: 'Ejemplero',
        edad: 18,
        email: 'juan@ejemplo.com',
        telefono: '1234567890'
    },
    {
        id: 4,
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
        nombre: 'Juan Perez',
        sobrenombre: 'Ejemplero',
        edad: 18,
        email: 'juan@ejemplo.com',
        telefono: '1234567890'
    }
];

export function findAll() {
    console.log("FIND ALL ORIGINAL");
    return contactos;
}

export function findOneById(id) {
    return contactos.find(contacto => contacto.id === id);
}

export function deleteById(id) {
    const index = contactos.findIndex(c => c.id == id);

    if (0 > index)
        throw new Error("No existe el contacto.");
    
    contactos.splice(index, 1);
}

export function create (contacto) {
    contacto.id = id++;
    contactos.push(contacto);
    return contacto;
}

export function updateById(id,contactoRecibido){
    const contactoAModificar = contactos.find(c => c.id === id);
    if (!contactoAModificar)
        throw new Error("No existe el contacto.");

    contactoAModificar.nombre = contactoRecibido.nombre;
    contactoAModificar.sobrenombre = contactoRecibido.sobrenombre;
    contactoAModificar.edad = contactoRecibido.edad;
    contactoAModificar.email = contactoRecibido.email;
    contactoAModificar.telefono = contactoRecibido.telefono;
    
    return contactoAModificar;
}