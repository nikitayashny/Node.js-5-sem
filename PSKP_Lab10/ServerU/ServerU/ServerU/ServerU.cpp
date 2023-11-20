#pragma warning(disable : 4996)
#pragma comment(lib, "WS2_32.lib")  

#include <iostream>
#include <cstring>
#include <winsock2.h>

const int BUFFER_SIZE = 1024;
const int SERVER_PORT = 3000;

int main() {
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        std::cerr << "Failed to initialize winsock" << std::endl;
        return 1;
    }

    SOCKET serverSocket;
    sockaddr_in serverAddress, clientAddress;
    char buffer[BUFFER_SIZE];

    serverSocket = socket(AF_INET, SOCK_DGRAM, 0);

    serverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = INADDR_ANY;
    serverAddress.sin_port = htons(SERVER_PORT);

    if (bind(serverSocket, (struct sockaddr*)&serverAddress, sizeof(serverAddress)) == SOCKET_ERROR) {
        std::cerr << "Failed to bind socket: " << WSAGetLastError() << std::endl;
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    std::cout << "UDP server listening on port " << SERVER_PORT << std::endl;

    while (true) {
        int clientAddressLength = sizeof(clientAddress);

        int receivedBytes = recvfrom(serverSocket, buffer, BUFFER_SIZE, 0,
            (struct sockaddr*)&clientAddress, &clientAddressLength);

        std::string response = "ECHO: " + std::string(buffer, receivedBytes);

        int sentBytes = sendto(serverSocket, response.c_str(), response.length(), 0,
            (struct sockaddr*)&clientAddress, clientAddressLength);
    }

    closesocket(serverSocket);
    WSACleanup();
    return 0;
}