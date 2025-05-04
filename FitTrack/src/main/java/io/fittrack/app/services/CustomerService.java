package io.fittrack.app.services;

import io.fittrack.app.entity.Customer;

public interface CustomerService {

    Customer findCustomerByUser(Integer userId);
}
