import { compare } from "bcrypt";
import { hashPassword } from "../helpers/AuthHelpers.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
export const registerController = async (req ,res) => {
    try {
        const{cin,nom,prenom,dateNais,tel,email,motdepasse,adresse} =req.body
        if (!cin) {
            return res.send({error :'cin est obligatoire ! '})
        }
        if (!nom) {
            return res.send({error :'nom est obligatoire ! '})
        }
        if (!prenom) {
            return res.send({error :'prenom est obligatoire ! '})
        }
        if (!dateNais) {
            return res.send({error :'date de Naissance  est obligatoire ! '})
        }
        if (!tel) {
            return res.send({error :'numéro du téléphone est obligatoire ! '})
        }
        if (!email) {
            return res.send({error :'email est obligatoire ! '})
        }
        if (!motdepasse) {
            return res.send({error :'mot de passe est obligatoire ! '})
        }
        if (!adresse) {
            return res.send({error :'adresse est obligatoire ! '})
        }

        // user exiting
        const exitingUser  = await userModel.findOne({email}) ;
        if (exitingUser) {
            return res.status(200).send({
                success : true ,
                message :'Cette utilisateur est existe !! ',

            })
        }
        //registre User
        const hashed = await hashPassword(motdepasse);
        //save 
        const user =  await new userModel({cin,nom,prenom,dateNais,tel,email,motdepasse:hashed,adresse} ).save();
        res.status(201).send({
            success : true ,
            message :' utilisateur est enregistrée avec successée ',
            user
        }) 

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false ,
            message :'Problem en registration !!! ',
            error
        })
    }
} ;

//login  
export const loginController = async(req,res)=> {
    try {
        const{email ,motdepasse} = req.body
        //validation
        if (!email || !motdepasse ) {
            return res.send({error :'Email et mot de passe sont obligatoires ! '})
        }
        //check user
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                success : false ,
                message :'Ce Email n existe pas !! ',

            })
        }
        const match = await compare(motdepasse , user.motdepasse);
        if (!match) {
            return res.status(200).send({
                success : false ,
                message :'Ce mot de passe incorrect !! ',

            })
        }
        // token 
        const token = await JWT.sign({_id : user.id}  , process.env.JWT_SECTRET, {expiresIn:"7d"});
        res.status(201).send({
            success : true ,
            message :'login seccessfully ',
            user:{
                cin:user.cin,
                nom:user.nom,
                prenom:user.prenom,
                dateNais:user.dateNais,
                tel:user.tel,
                email:user.email,
                motdepasse:user.motdepasse,
                adresse:user.adresse
            },
            token
        }) 
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success:false ,
            message :'Problem en login !!! ',
            error
        })
    }
};


//test controller 
export const testController = async(req,res)=>{
    try {
        res.send("protected route")
    } catch (error) {
       console.log(error
       ) 
    }
    
}

