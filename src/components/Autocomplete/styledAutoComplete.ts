import styled, { css } from 'styled-components';
// components
import { motion } from 'framer-motion';
import BoxWrapper from '@/components/Box/StyledBox';
import Link from 'next/link';

const Container = styled(BoxWrapper)`
  max-width: 100%;
  position: relative;

  ${({ theme, width }) =>
    !width &&
    css`
      width: 90%;

      @media ${theme.device.sm} {
        max-width: 850px;
        width: 75%;
      }
      @media ${theme.device.lg} {
        width: 55%;
      }
    `}

  label {
    height: 0;
    overflow: hidden;
    visibility: hidden;
    width: 0;
  }
`;

const Input = styled.input<{ $isOpen: Boolean }>`
  font-size: 0.7rem;
  font-weight: 400;
  height: 50px;
  line-height: 1.5;
  max-width: 100%;
  outline: none;
  padding: 0.2rem 0.5rem;
  width: 100%;

  ${({ theme, $isOpen }) => css`
    background-color: ${theme.colors.black};
    border: ${theme.colors.black};
    border-radius: ${$isOpen ? '0.25rem 0.25rem 0 0' : '0.25rem'};
    color: ${theme.colors.white};

    &::placeholder {
      color: ${theme.colors.white};
      font-style: italic;
      font-weight: 500;
    }

    @media ${theme.device.md} {
      font-size: 1rem;
      padding: 0.375rem 0.75rem;
    }
  `}
`;

const ListWrapper = styled(motion.div)`
  border-radius: 0 0 0.25rem 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  left: 0;
  margin-top: 50px;
  position: absolute;
  right: 0;
  z-index: 2;

  ${({ theme }) =>
    css`
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.white};
      border-top: none;
    `}
`;

const OptionImg = styled.img`
  width: 40px;
`;

const OptionWrapper = styled(Link)`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
  gap: 1em;
  justify-content: space-between;
  min-height: 55px;
  padding: 0.5em 1em;

  svg {
    padding: 5px;
    width: 40px;
  }

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};

    &:hover,
    &:active,
    &:focus {
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};

      svg path {
        fill: ${theme.colors.white};
        stroke: ${theme.colors.black};
      }
    }
  `}
`;

const Option = styled.span`
  font-size: 1.3em;
  font-weight: 600;
  text-transform: capitalize;
`;

const PokeID = styled(Option)`
  font-size: 1.5em;
  font-weight: 600;
`;

export { Container, Input, ListWrapper, OptionWrapper, OptionImg, Option, PokeID };
