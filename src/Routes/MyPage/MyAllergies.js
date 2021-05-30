import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './MyAllergies.scss';
import axios from 'axios';
import { setUserAllergyInfo } from 'api';
import { Link } from 'react-router-dom';
import {
  Col,
  Container,
  Button,
  Card,
  CardText,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

function MyAllergies() {
  const [allergy, setAllergy] = useState('');
  const [allergyList, setAllergyList] = useState([]);

  useEffect(() => {
    try {
      console.log('유즈이펙트', allergy);
      if (allergy == '') {
        console.log('패스');
      } else {
        setAllergyList([...allergyList, allergy]);
        console.log(allergyList);
      }
    } catch (e) {
      console.log(e);
    }
  }, [allergy]);

  const onChange = (e) => {
    if (e.target.checked == true) {
      console.log('온체인지 true', e.target.checked);
      setAllergy(e.target.name);
    } else if (e.target.checked == false) {
      console.log('온체인지 false', e.target.checked);
      onRemove(e.target.name);
    }
  };

  const onCheck = () => {};

  const onRemove = (name) => {
    setAllergyList(allergyList.filter((allergy) => allergy !== name));
    console.log('onRemove 작동', allergyList);
  };

  // const oncc = useEffect(() => {
  //   setAllergyList([...allergyList, allergy]);
  //   console.log('여기는 함수 유즈이펙트', allergy);
  // }, [allergy]);

  // const onClick = (allergy) => {
  //   //여기서 서버랑 연동해서 해야함
  //   console.log('여기는 클릭부분에서 나오느 콘솔콘솔코코콘솔');
  //   console.log('온클릭', allergy);
  //   setAllergyList([...allergyList, allergy]);
  //   console.log('여기서부터는 알러지 리스트 나오는 부분임');
  //   console.log(allergyList);
  // };

  const createAllergy = async () => {
    try {
      await setUserAllergyInfo.setAllergies(allergyList);
      alert('등록되었습니다.');
    } catch (e) {
      alert(e.response.data['error-message']);
    }
  };

  return (
    <div className="myAllergies">
      <br />
      <br />
      <Container>
        <div>
          <Row>
            <Col md="8">
              <p className="changeAllergyInfo">알러리 정보 변경하기</p>
            </Col>
            <Col md="2">
              <Button color="primary" size="sm">
                전부해제
              </Button>
            </Col>
            <Col md="2">
              <Link to="/mypage">
                <Button color="danger" size="sm">
                  취소하기
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <br />
        <br />
        <div>
          <Form className="checkboxGroup">
            <Row>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="아몬드" onChange={onChange} />
                    아몬드
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="우유" onChange={onChange} />
                    우유
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="대두" onChange={onChange} />
                    대두
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="밀" onChange={onChange} /> 밀
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="닭고기" onChange={onChange} />
                    닭고기
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="쇠고기" onChange={onChange} />
                    쇠고기
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="새우" onChange={onChange} />
                    새우
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="오징어" onChange={onChange} />
                    오징어
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="잣" onChange={onChange} /> 잣
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="소고기" onChange={onChange} />{' '}
                    소고기
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="돼지고기"
                      onChange={onChange}
                    />{' '}
                    돼지고기
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="메추리알"
                      onChange={onChange}
                    />{' '}
                    메추리알
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="토마토" onChange={onChange} />{' '}
                    토마토
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="조개류" onChange={onChange} />{' '}
                    조개류
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="난류" onChange={onChange} />{' '}
                    난류
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="호두" onChange={onChange} />{' '}
                    호두
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="복숭아" onChange={onChange} />{' '}
                    복숭아
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="땅콩" onChange={onChange} />
                    땅콩
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="게" onChange={onChange} /> 게
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="아황산류"
                      onChange={onChange}
                    />
                    아황산류
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="메밀" onChange={onChange} />{' '}
                    메밀
                  </Label>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" name="계란" onChange={onChange} />{' '}
                    계란
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Button
            outline
            color="warning"
            size="sm"
            block
            onClick={createAllergy}
          >
            저장하기
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default MyAllergies;

// "allergyList": [
// "string"
//   ],
