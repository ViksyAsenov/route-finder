# Route Finder

## Overview

This repository contains a solution for optimizing deliveries within a logistics network, ensuring efficient routing, minimal distance traveled, and optimal fuel usage.

## Input

### Package

- **Format**: `FromCity,PackageName,ToCity,Weight`
- **Example**: `Sofia,PackageA,Plovdiv,100`

### Van

- **Format**: `StartCity,LoadCapacity`
- **Example**: `Sofia,250`

### Destinations

- **Format**: `CityA,CityB,Distance`
- **Example**: `Sofia,Plovdiv,146`

## Routing Types

### Common Criteria

All routing types must:

- Ensure load capacity is not exceeded.
- Deliver all packages to their respective destinations.
- Pick up all packages upon arrival in a city.
- Start and finish in the same city.

### Basic Route

- Minimize total cities traveled to.
- The route starts and ends at a specified warehouse.

### Shortest Route

- Minimize total distance traveled.
- The route can start at any warehouse.

### Most Efficient Route

- Minimize fuel consumption.
- The route can start at any warehouse.
- Fuel consumption is calculated by: `(Distance * (10 + Total package weight in the bus / 100)) / 100`
