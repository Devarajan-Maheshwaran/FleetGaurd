from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()

class LogEntry(Base):
    __tablename__ = 'log_entries'
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    vehicle_id = Column(String)
    log = Column(Text)
    error = Column(String)
    action_taken = Column(String)
    status = Column(String)  # resolved, active

DATABASE_URL = "sqlite:///fleetguard.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
