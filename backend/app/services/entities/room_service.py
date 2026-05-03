from typing import Optional
from sqlalchemy.orm import Session
from app.services.infra.base_service import BaseService
from app.repositories.room_repository import room_repository
from app.models.room import Sala
from app.schemas.room import RoomCreate, RoomUpdate

class RoomService(BaseService[Sala]):
    def __init__(self):
        super().__init__(room_repository)
        
    def create(self, db: Session, data: RoomCreate) -> Sala:
        db_data = {
            "codigo_sala": data.nomeSala,
            "descricao_sala": data.descricao_sala,
            "limite_usuarios": data.capacidade,
            "fk_tipo_sala": data.tipoSalaId,
            "ativada": True,
            "sala_ativada": True
        }
        try:
            return self.repository.create(db, db_data)
        except Exception as e:
            if "UNIQUE constraint failed" in str(e) or "Duplicate" in str(e) or "UniqueViolation" in str(e) or "duplicate key value" in str(e):
                from fastapi import HTTPException
                raise HTTPException(status_code=409, detail="Sala com este código já existe")
            raise e

    def update(self, db: Session, id: int, data: RoomUpdate) -> Optional[Sala]:
        db_obj = self.repository.get_by_id(db, id)
        if not db_obj:
            return None
        
        update_data = {}
        if data.nomeSala is not None:
            update_data["codigo_sala"] = data.nomeSala
        if data.descricao_sala is not None:
            update_data["descricao_sala"] = data.descricao_sala
        if data.capacidade is not None:
            update_data["limite_usuarios"] = data.capacidade
        if data.tipoSalaId is not None:
            update_data["fk_tipo_sala"] = data.tipoSalaId
            
        return self.repository.update(db, db_obj, update_data)

room_service = RoomService()
