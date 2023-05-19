# kitty-chan-domain

kitty-chan-domain is a domain microservice layer of the kitty chan Discord Bot. This microservice is responsible for receiving gRPC events from the [kitty-chan-events](https://github.com/live-apps-in/kitty-chan-events) service. 

As a central repository, the kitty-chan-domain ensures that all other microservices within the kitty chan ecosystem have access to the most up-to-date and consistent data. By relying on the shared Redis database, the domain layer effectively manages and synchronizes the information used by all the microservices. The communication between the different microservices is facilitated through gRPC events, with the kitty-chan-events service being responsible for sending these events to the kitty-chan-domain microservice. The domain layer then processes and handles these events, ensuring that the shared Redis database is accurately updated.

However, it's important to note that the kitty-chan Discord Bot is currently in the early stages of development. This microservice is being actively worked on to enhance its functionality and provide an enjoyable experience to the users.
