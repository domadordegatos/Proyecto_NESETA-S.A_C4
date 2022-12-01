package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.FacturadorModel;

@Repository
public interface FacturadorRepository extends MongoRepository<FacturadorModel, String>  {
    
}
