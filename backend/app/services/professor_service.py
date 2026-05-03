from fastapi import HTTPException, status
from typing import Optional, List
from sqlalchemy.orm import Session
from app.services.base_service import BaseService
from app.repositories.base_repository import BaseRepository
from app.models.user import Usuario
from app.schemas.professor import ProfessorCreate, ProfessorUpdate
from app.services.security import hash_password

class ProfessorService:
    def get_all(self, db: Session) -> List[Usuario]:
        # Return all users where tipo_usuario == 2 (Professor)
        return db.query(Usuario).filter(Usuario.tipo_usuario == 2).all()
        
    def get_by_id(self, db: Session, id: int) -> Optional[Usuario]:
        return db.query(Usuario).filter(Usuario.id == id, Usuario.tipo_usuario == 2).first()

    def create(self, db: Session, data: ProfessorCreate) -> Usuario:
        if not data.emailProf or not str(data.emailProf).strip():
            raise HTTPException(status_code=400, detail="E-mail do professor é obrigatório")

        if db.query(Usuario).filter(Usuario.email == data.emailProf).first():
            raise HTTPException(status_code=409, detail="Professor com este e-mail já cadastrado")

        mat = (data.matriculaProf or "").strip() or None
        if mat and db.query(Usuario).filter(Usuario.matricula == mat).first():
            raise HTTPException(status_code=409, detail="Professor com esta matrícula já cadastrada")
            
        baseUser = data.emailProf.split('@')[0]
        
        username = baseUser
        suffix = 1
        while db.query(Usuario).filter(Usuario.username == username).first():
            username = f"{baseUser}{suffix}"
            suffix += 1

        db_obj = Usuario(
            nome=data.nomeProf,
            email=data.emailProf.strip(),
            matricula=mat,
            tipo_usuario=2, # Professor
            status="aprovado",
            senha=hash_password("mudarsenha123"), # Default password
            username=username
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, id: int, data: ProfessorUpdate) -> Optional[Usuario]:
        db_obj = self.get_by_id(db, id)
        if not db_obj:
            return None
        
        if data.nomeProf is not None:
            db_obj.nome = data.nomeProf
        if data.emailProf is not None:
            db_obj.email = data.emailProf
        if data.matriculaProf is not None:
            m = (data.matriculaProf or "").strip() or None
            db_obj.matricula = m
            
        db.commit()
        db.refresh(db_obj)
        return db_obj
        
    def delete(self, db: Session, id: int) -> bool:
        db_obj = self.get_by_id(db, id)
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True

professor_service = ProfessorService()