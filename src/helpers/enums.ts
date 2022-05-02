export enum LandmarkType {
    Food = 'Food',
    Museum = 'Museum',
    Gallery = 'Gallery',
    Historical = 'Historical',
    Ancient = 'Ancient site (Ruin)',
    Fountain = 'Fountain',
    Obelisk = 'Obelisk',
    Monument = 'Monument',
    Square = 'Square',
    // TODO: This should be created/managed by admin instead of hardcoding
}

// TODO: Rethink if we want to store roles within a database
export enum Role {
    User = 'user',
    Admin = 'admin',
}