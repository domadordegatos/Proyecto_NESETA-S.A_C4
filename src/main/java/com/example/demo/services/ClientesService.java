package com.example.demo.services;

import java.util.Optional;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.ClientesModel;
import com.example.demo.repositories.ClientesRepository;

@Service
public class ClientesService {
    @Autowired
    ClientesRepository clientesRepository;

    public Optional<ClientesModel> getClienteById(String id){
        return clientesRepository.findById(id);
    }
    
    public List<ClientesModel> getClientes() {
        List<ClientesModel> listaClientes= clientesRepository.findAll();
        listaClientes.sort(Comparator.comparing(ClientesModel::getNombre));//revisar ::
        return listaClientes;
    }

    public ClientesModel saveCliente(ClientesModel cliente) {
          return clientesRepository.save(cliente);
    }

    public String deleteClienteById(String id) {
        if (clientesRepository.existsById(id)) {
            clientesRepository.deleteById(id);
            return "cliente Eliminado";
        } else {
            return "Error No existe ese Id";
        }
    }
}
