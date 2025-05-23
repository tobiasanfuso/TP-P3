import { Users } from "../Models/Users.js";

//obtener todos los users

export const getAllUsers = async(req,res) => {
    try{
        const users = await Users.findAll({
            attributes: ['id','username','email','role','createdAt','updatedAt']
        });
        res.json(users);
    }catch(error){
        console.error("Error al obtener usuarios",error);
        res.status(500).json({message: "error del server"});
    }
};

//obtener userbyID
export const getUserById = async (req,res) => {
    const {id} = req.params;
    try{
        const user = await Users.findByPk(id,{
            attributes:['id','username','email','role']
        });
        if(!user) return res.status(404).json({message: "Usuario no encontrado"});
        res.json(user);
    }catch(error){
        res.status(500).json({message: "error del server"});
    }
        
};

//update users
export const updateUser = async (req,res) => {
    const {id} = req.params;
    const {username,email,role} = req.body;
    try{
        const user = await Users.findByPk(id);
        if(!user) return res.status(404).json({message: "Usuario no encontrado"});

        user.username = username ?? user.username;
        user.email = email ?? user.email;
        user.role = role ?? user.role;

        await user.save();
        res.json({message: "Usuario actualizado", user});
    }catch{
        res.status(500).json({message:"error del server"});
    }
};

//delete user
export const deleteUser = async(req,res) => {
    const {id} = req.params;
    try{
        const user = await Users.findByPk(id);
        if(!user) return res.status(404).json({message:"Usuario no encontrado"});

        await user.destroy();
        res.json({message:"Usuario eliminado"});
    }catch{
        res.status(500).json({message: "error del server"});
    }
}

export const updateUserRole = async(req,res) => {
    const {id} = req.params;
    const {role} = req.body;
    

    const validRoles = ["customer","admin","sysadmin"];
    if(!validRoles.includes(role)){
        return res.status(400).json({message: "Rol invalido"});
    }

    try{
        const user = await Users.findByPk(id);
        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        user.role = role;
        await user.save();

        res.json({message:"Rol actualizado correctamente",user});
    
    }catch(error){
        res.status(500).json({message:"error al actualizar rol",error});
    }
};