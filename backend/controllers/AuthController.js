import pkg from 'bcryptjs';
const { compare } = pkg; // Correctly import compare function

import { hashPassword } from "../helpers/AuthHelpers.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { cin, nom, prenom, dateNais, tel, email, motdepasse, adresse, imageProfil } = req.body;

        // Validation des champs requis
        if (!cin) return res.send({ error: 'cin est obligatoire !' });
        if (!nom) return res.send({ error: 'nom est obligatoire !' });
        if (!prenom) return res.send({ error: 'prenom est obligatoire !' });
        if (!dateNais) return res.send({ error: 'date de Naissance est obligatoire !' });
        if (!tel) return res.send({ error: 'numéro du téléphone est obligatoire !' });
        if (!email) return res.send({ error: 'email est obligatoire !' });
        if (!motdepasse) return res.send({ error: 'mot de passe est obligatoire !' });
        if (!adresse) return res.send({ error: 'adresse est obligatoire !' });

        // Vérifier si l'utilisateur existe déjà
        const exitingUser = await userModel.findOne({ email });
        if (exitingUser) {
            return res.status(200).send({
                success: true,
                message: 'Cette utilisateur existe déjà !',
            });
        }

        // Hacher le mot de passe
        const hashed = await hashPassword(motdepasse);

        // Enregistrer l'utilisateur
        const user = await new userModel({
            cin,
            nom,
            prenom,
            dateNais,
            tel,
            email,
            motdepasse: hashed,
            adresse,
            imageProfil 
        }).save();

        res.status(201).send({
            success: true,
            message: 'Utilisateur enregistré avec succès',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Problème lors de l\'enregistrement !!!',
            error
        });
    }
};

// login
export const loginController = async (req, res) => {
    try {
        const { email, motdepasse } = req.body;
        
        // Validation
        if (!email || !motdepasse) {
            return res.send({ error: 'Email et mot de passe sont obligatoires !' });
        }

        // Vérifier si l'utilisateur existe
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Ce Email n\'existe pas !!',
            });
        }

        // Comparer les mots de passe
        const match = await compare(motdepasse, user.motdepasse);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Ce mot de passe est incorrect !!',
            });
        }

        // Générer le token JWT
        const token = await JWT.sign(
            { _id: user.id },
            process.env.JWT_SECRET, // Fixed spelling of JWT_SECRET
            { expiresIn: "7d" }
        );

        // Réponse avec les informations utilisateur, y compris l'image de profil
        res.status(201).send({
            success: true,
            message: 'Login successfully',
            user: {
                cin: user.cin,
                nom: user.nom,
                prenom: user.prenom,
                dateNais: user.dateNais,
                tel: user.tel,
                email: user.email,
                adresse: user.adresse,
                imageProfil: user.imageProfil // Ajouter l'image de profil ici
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Problème lors de la connexion !!!',
            error
        });
    }
};
