"""
Admin-related database models: admin_login, admin_details, roles
"""
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class AdminRole(Base):
    __tablename__ = "admin_roles"

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class AdminDetails(Base):
    __tablename__ = "admin_details"

    id = Column(Integer, primary_key=True, index=True)
    role_id = Column(Integer, ForeignKey("admin_roles.id"), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=True)
    mobile_number = Column(String(30), nullable=True)
    email_id = Column(String(255), unique=True, nullable=False, index=True)
    profile_url = Column(String(255), nullable=True)
    is_live = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    role = relationship("AdminRole")


class AdminLogin(Base):
    __tablename__ = "admin_login"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("admin_details.id"), nullable=False, index=True)
    email_id = Column(String(255), nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    is_locked = Column(Boolean, nullable=False, default=False)
    failed_login_attempts = Column(Integer, nullable=False, default=0)
    locked_until = Column(DateTime(timezone=True), nullable=True)
    last_login = Column(DateTime(timezone=True), nullable=True)
    is_first_time_password_changed = Column(Boolean, nullable=False, default=False)
    password_changed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    admin = relationship("AdminDetails")
