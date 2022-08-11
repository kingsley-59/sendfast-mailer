import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    padding: 10px 8px;
    border: none;
    border-bottom: 1px solid #212529;
    &:active, &:focus, &:valid {
        border-bottom: 1px solid #0d6efd;
    }
`

export {
    Input
}