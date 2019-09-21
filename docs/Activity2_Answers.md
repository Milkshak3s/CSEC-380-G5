# Activity 2

1. What Web Application security mechanisms are involved in your topology? What security mechanisms would ideally be involved? 

- Web Application Firewall (WAF) is the only security mechanism involved in the current topology. 
Ideally, security mechanisms like load balancer and security as a service product (like cloudflare). 
However, these two mechanisms have been excluded after a thorough threat modeling. 

A) In this project, there is no threat, but the developers (group 5 teammates) themselves. 
B) In this project, there is no asset which holds real-world business value. 
C) In this project, there is no external threat. 

Based on these reasonings, the security mechanisms mentioned above was not implemented. 

2. What testing framework did you choose and why? 

Python's unittest was chosen for two reason. 

A) In group 5, all four of the developers are familiar with python to create new tests on the fly. 
B) Unittest is inside standard library of python, which means different environment is not a concern. 

However, it should be noted that the testing framework could change in the future. 
For this milestone, there was no heavy testing. However, from the next milestone, there will be 
heavy testing. Thus, the teammates will discuss about the testing framework in the future. 
