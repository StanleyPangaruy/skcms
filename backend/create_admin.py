# create_admin.py
from database import SessionLocal
from models import AdminUser
from auth import get_password_hash

db = SessionLocal()
new_admin = AdminUser(username="admin", hashed_password=get_password_hash("admin123"))
db.add(new_admin)
db.commit()
print("Admin user created.")
