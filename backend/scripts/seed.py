import os
import sys

# Diret?rio raiz do backend no path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlalchemy.orm import Session
from app.try_database import SessionLocal
from app.models.user import Usuario
from app.services.auth.security import hash_password


def seed_initial_data():
    """Apenas administrador padr?o ? salas, tipos e demais cadastros via painel ou API."""
    db: Session = SessionLocal()
    try:
        admin_exists = db.query(Usuario).filter(Usuario.email == "admin@uepa.br").first()
        if not admin_exists:
            admin = Usuario(
                nome="Administrador",
                email="admin@uepa.br",
                username="admin",
                senha=hash_password("admin456"),
                tipo_usuario=3,
                status="aprovado",
            )
            db.add(admin)
            db.commit()
            print("Admin criado: admin@uepa.br (senha: admin456).")
        else:
            print("Admin admin@uepa.br j? existe ? seed ignorado.")
    except Exception as e:
        print(f"Erro ao executar seed: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_initial_data()
