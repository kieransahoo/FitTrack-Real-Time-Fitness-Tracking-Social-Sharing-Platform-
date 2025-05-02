package io.fittrack.app.services;

import io.fittrack.app.entity.Customer;
import io.fittrack.app.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public void registerCustomer(Customer customer) {
       customerRepository.save(customer);
    }
}
