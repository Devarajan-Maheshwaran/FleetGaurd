#!/usr/bin/env python3

# Test script to verify SQLAlchemy imports work correctly

try:
    from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
    print("✓ Successfully imported from sqlalchemy")

    from sqlalchemy.ext.declarative import declarative_base
    print("✓ Successfully imported declarative_base")

    from sqlalchemy.orm import sessionmaker
    print("✓ Successfully imported sessionmaker")

    # Test creating a simple model
    Base = declarative_base()

    class TestModel(Base):
        __tablename__ = 'test'
        id = Column(Integer, primary_key=True)
        name = Column(String)

    print("✓ Successfully created test model")

    print("\nAll SQLAlchemy imports are working correctly!")

except ImportError as e:
    print(f"✗ Import error: {e}")
except Exception as e:
    print(f"✗ Error: {e}")
