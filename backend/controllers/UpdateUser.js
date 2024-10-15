import User from "../models/userModel.js"; // Assurez-vous d'importer correctement votre modèle

export const updateUser = async (req, res) => {
  try {
    const { nom, prenom, email, cin, dateNais, tel, adresse } = req.body;

    // Trouver l'utilisateur par son email (ou par son CIN si nécessaire)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations utilisateur
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    
    // Vérifiez si l'email ou le CIN a changé avant de les mettre à jour
    if (user.email !== email) {
      // Vous pouvez ajouter une vérification pour l'unicité ici
      user.email = email;
    }

    if (user.cin !== cin) {
      // Vous pouvez ajouter une vérification pour l'unicité ici
      user.cin = cin;
    }

    user.dateNais = dateNais || user.dateNais;
    user.tel = tel || user.tel;
    user.adresse = adresse || user.adresse;

    await user.save();

    // Réponse réussie avec les nouvelles données utilisateur
    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la mise à jour' });
  }
};
